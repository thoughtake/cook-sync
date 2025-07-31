import { Dish, DishIngredient, DishRecipe, Ingredient, Unit } from "@/types";
import Image from "next/image";
import { memo, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import InputText from "../common/ui/form/input-text";
import SelectBox from "../common/ui/form/select-box";
import IconButton from "../common/ui/button/icon-button";
import { PlusIcon, Trash2 } from "lucide-react";
import StandardButton from "../common/ui/button/standard-button";
import InputTextarea from "../common/ui/form/input-textarea";

//料理タイプ（編集用）
type EditedDish = Pick<Dish, "id" | "isFavorite" | "imageUrl"> &
  Partial<Pick<Dish, "name" | "timeMinutes" | "servings">>;

//材料タイプ（編集用）
type EditedDishIngredient = Pick<DishIngredient, "dishId"> &
  Partial<Omit<DishIngredient, "name">>;

//レシピタイプ（編集用）
type EditedDishRecipe = Pick<DishRecipe, "dishId"> &
  Partial<Omit<DishRecipe, "dishId">>;

type Props = {
  dishId: number;
  dish: Dish;
  ingredientsForDish: DishIngredient[];
  recipesForDish: DishRecipe[];
  ingredients: Ingredient[];
  units: Unit[];
  isEditMode: boolean;
  setIsEditMode?: React.Dispatch<SetStateAction<boolean>>;
};

const DishForm = (props: Props) => {

  const {
    dishId,
    dish,
    ingredientsForDish,
    recipesForDish,
    ingredients,
    units,
    isEditMode,
    setIsEditMode,
  } = props;

  //料理（編集用）
  const [editedDish, setEditedDish] = useState<EditedDish | undefined>(dish);

  //材料（編集用）
  const [editedDishIngredients, setEditedDishIngredients] =
    useState<EditedDishIngredient[]>(ingredientsForDish);

  //レシピ（編集用）
  const [editedDishRecipes, setEditedDishRecipes] =
    useState<EditedDishRecipe[]>(recipesForDish);

  //編集画像のエラー真偽
  const [editedImageIsError, setEditedImageIsError] = useState<boolean>(false);

  //セレクト用オプション（既存の材料を除く）
  const ingredientsOption = useMemo<Ingredient[]>(() => {
    return ingredients.filter(
      (i) => !editedDishIngredients.some((edi) => edi.ingredientId === i.id)
    );
  }, [ingredients, editedDishIngredients]);

  const resetEditedContent = useCallback(() => {
    setEditedDish(dish);
    setEditedDishIngredients(ingredientsForDish);
    setEditedDishRecipes(recipesForDish);
  }, [
    dish,
    ingredientsForDish,
    recipesForDish,
    setEditedDish,
    setEditedDishIngredients,
    setEditedDishRecipes,
  ]);

  //PUT可能か判断する
  const isDisabled = useMemo(() => {
    if (editedDish && editedDishIngredients && editedDishRecipes) {
      const dishKeys: (keyof Dish)[] = [
        "id",
        "name",
        "timeMinutes",
        "servings",
        "isFavorite",
      ];
      const dishIngredientKeys: (keyof EditedDishIngredient)[] = ["dishId"];
      const dishRecipeKeys: (keyof EditedDishRecipe)[] = [
        "dishId",
        "stepNumber",
      ];

      const hasDishKeys = dishKeys.every((key) => {
        const value = editedDish[key];
        if (key !== "id" && typeof value === "number") {
          return value !== 0 && value !== undefined && value !== null;
        } else {
          return value !== "" && value !== undefined && value !== null;
        }
      });

      const hasDishIngredientKeys =
        editedDishIngredients.length !== 0 &&
        editedDishIngredients.every((ingredient) =>
          dishIngredientKeys.every((key) => {
            const value = ingredient[key];
            if (
              key !== "id" &&
              key !== "dishId" &&
              key !== "ingredientId" &&
              typeof value === "number"
            ) {
              return value !== 0 && value !== undefined && value !== null;
            } else {
              return value !== "" && value !== undefined && value !== null;
            }
          })
        );

      const hasDishRecipeKeys =
        editedDishRecipes.length !== 0 &&
        editedDishRecipes.every((recipe) =>
          dishRecipeKeys.every((key) => {
            const value = recipe[key];
            if (key !== "id" && key !== "dishId" && typeof value === "number") {
              return value !== 0 && value !== undefined && value !== null;
            } else {
              return value !== "" && value !== undefined && value !== null;
            }
          })
        );

      return !hasDishKeys || !hasDishIngredientKeys || !hasDishRecipeKeys;
    } else {
      return true;
    }
  }, [editedDish, editedDishIngredients, editedDishRecipes]);

  if (!editedDish) return;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="relative w-full h-70 mb-3">
        {editedDish.imageUrl && !editedImageIsError ? (
          <Image
            src={editedDish.imageUrl}
            alt={editedDish.name ? editedDish.name : ""}
            fill
            className="object-contain"
            onError={() => setEditedImageIsError(true)}
          />
        ) : (
          <div className="flex items-center justify-center bg-cancel text-white w-full h-full">
            <span className="font-bold text-4xl">No Image</span>
          </div>
        )}
      </div>
      <InputText
        name="imageUrl"
        label="画像のURL"
        value={editedDish.imageUrl ? editedDish.imageUrl : ""}
        isRequired={false}
        onChange={(e) => {
          setEditedImageIsError(false);
          setEditedDish({ ...editedDish, imageUrl: e.target.value });
        }}
      />
      {/* 料理名 */}
      <InputText
        name="name"
        label="料理名"
        value={editedDish.name ? editedDish.name : ""}
        isRequired={true}
        onChange={(e) => {
          setEditedDish({ ...editedDish, name: e.target.value });
        }}
      />

      {/* 所要時間 */}
      <InputText
        name="timeMinutes"
        label="所要時間"
        value={
          editedDish.timeMinutes !== undefined
            ? String(editedDish.timeMinutes)
            : ""
        }
        isRequired={true}
        onChange={(e) => {
          setEditedDish({
            ...editedDish,
            timeMinutes: e.target.value ? Number(e.target.value) : undefined,
          });
        }}
        suffix="分"
        className="w-1/3 text-right"
      />

      {/* 分量 */}
      <InputText
        name="servings"
        label="分量"
        value={editedDish.servings ? String(editedDish.servings) : ""}
        isRequired={true}
        onChange={(e) => {
          setEditedDish({
            ...editedDish,
            servings:
              e.target.value !== undefined ? Number(e.target.value) : undefined,
          });
        }}
        suffix="人前"
        className="w-1/3 text-right"
      />

      <h3 className="flex justify-center items-center text-xl font-bold  bg-primary py-1 mb-8">
        <span className="mr-3">材料</span>
        <span className="bg-attention text-sm text-white px-1 py-1 rounded">
          必須
        </span>
      </h3>
      <ul>
        {editedDishIngredients.map((edi, index) => {
          const targetIngredient = ingredients.find(
            (ingredient) => edi.ingredientId === ingredient.id
          );
          const targetUnit = units.find(
            (unit) => targetIngredient?.unitId === unit.id
          );

          return (
            <li key={index} className="flex justify-between">
              <SelectBox
                name={`ingredient-${index}`}
                label="料理"
                value={edi.ingredientId ? String(edi.ingredientId) : ""}
                isRequired={false}
                onChange={(value) => {
                  const newIngredients = editedDishIngredients.map(
                    (ingredient, i) =>
                      i === index
                        ? { ...ingredient, ingredientId: Number(value) }
                        : ingredient
                  );
                  setEditedDishIngredients(newIngredients);
                }}
                options={[
                  ...(targetIngredient
                    ? [
                        {
                          id: targetIngredient.id,
                          name: targetIngredient.name,
                        },
                      ]
                    : []),
                  ...ingredientsOption.map((ingredient) => ({
                    id: ingredient.id,
                    name: ingredient.name,
                  })),
                ]}
                className="w-100"
                showLabel={false}
              />
              <div className="flex items-center justify-end flex-1">
                {targetUnit && (
                  <div className="flex items-center">
                    <InputText
                      name={`ingredient-quantity-${index}`}
                      label=""
                      value={edi.quantity ? edi.quantity : ""}
                      isRequired={false}
                      onChange={(e) => {
                        const isValid = /^\d+(\.\d{0,2})?$/.test(
                          e.target.value
                        );
                        if (isValid) {
                          const newIngredients = editedDishIngredients.map(
                            (ingredient, i) =>
                              i === index
                                ? {
                                    ...ingredient,
                                    quantity: e.target.value,
                                  }
                                : ingredient
                          );
                          setEditedDishIngredients(newIngredients);
                        }
                      }}
                      className="text-right mr-3"
                      showLabel={false}
                    />
                    <div className="mb-7 w-10">{targetUnit.name}</div>
                  </div>
                )}
                {/* 削除ボタン */}
                <IconButton
                  icon={Trash2}
                  variant="filled"
                  size="sm"
                  radius="circle"
                  color="red"
                  onClick={() => {
                    const newIngredients = [...editedDishIngredients];
                    newIngredients.splice(index, 1);
                    setEditedDishIngredients(newIngredients);
                  }}
                  className="mb-7"
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-start">
        <StandardButton
          label="追加"
          variant="outline"
          color="black"
          size="sm"
          icon={PlusIcon}
          onClick={() => {
            setEditedDishIngredients([
              ...editedDishIngredients,
              {
                dishId: dishId,
              },
            ]);
          }}
        />
      </div>
      <h3 className="text-xl font-bold text-center bg-primary py-1 mb-3 mt-10">
        手順
      </h3>
      <ul>
        {editedDishRecipes.map((edr, index) => (
          <li key={index} className="flex justify-between py-5">
            <div className="flex">
              <div className="w-13">
                <span className="flex justify-center items-center bg-primary w-8 h-8 font-bold rounded-full">
                  {/* {edr.stepNumber} */}
                  {index + 1}
                </span>
              </div>
              {/* <p className="flex-1">{edr.description}</p>
               */}
              <InputTextarea
                name={`recipe-${index}`}
                label="手順"
                value={edr.description ? edr.description : ""}
                isRequired={false}
                onChange={(e) => {
                  const newRecipes = editedDishRecipes.map((recipe, i) =>
                    i === index
                      ? { ...recipe, description: e.target.value }
                      : recipe
                  );
                  setEditedDishRecipes(newRecipes);
                }}
                className="w-180 h-30"
                showLabel={false}
                hasMargin={false}
              />
            </div>
            <div className="flex justify-center items-center">
              {/* 削除ボタン */}
              <IconButton
                icon={Trash2}
                variant="filled"
                size="sm"
                radius="circle"
                color="red"
                onClick={() => {
                  const spliceRecipes = [...editedDishRecipes];
                  spliceRecipes.splice(index, 1);
                  const newRecipes = spliceRecipes.map((recipe, i) => ({
                    ...recipe,
                    stepNumber: i + 1,
                  }));

                  // [...editedDishRecipes];
                  // newRecipes.splice(index, 1);
                  setEditedDishRecipes(newRecipes);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-start">
        <StandardButton
          label="追加"
          variant="outline"
          color="black"
          size="sm"
          icon={PlusIcon}
          onClick={() => {
            setEditedDishRecipes([
              ...editedDishRecipes,
              {
                dishId: dishId,
                stepNumber: editedDishRecipes.length + 1,
              },
            ]);
          }}
        />
      </div>

      <div className="flex gap-4 mt-8">
        <StandardButton
          label="編集"
          variant="filled"
          color="green"
          isDisabled={isDisabled}
          className="flex-1"
        />
        <StandardButton
          label="キャンセル"
          variant="filled"
          color="gray"
          className="flex-1"
          onClick={() => {
            if (setIsEditMode) {
              setIsEditMode(false)
            }
            resetEditedContent();
          }}
        />
      </div>
    </form>
  );
};

export default memo(DishForm);
