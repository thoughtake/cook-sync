import { Dish, DishIngredient, DishRecipe, Ingredient } from "@/types";
import Image from "next/image";
import { memo, SetStateAction, useCallback, useMemo, useState } from "react";
import InputText from "../common/ui/form/input-text";
import SelectBox from "../common/ui/form/select-box";
import IconButton from "../common/ui/button/icon-button";
import { PlusIcon, Trash2 } from "lucide-react";
import StandardButton from "../common/ui/button/standard-button";
import InputTextarea from "../common/ui/form/input-textarea";
import { useModal } from "@/context/modal-context";
import useIngredients from "@/hooks/use-ingredients";
import useDishes from "@/hooks/use-dishes";
import useDishIngredients from "@/hooks/use-dish-Ingredients";
import useDishRecipes from "@/hooks/use-dish-recipes";
import useUnits from "@/hooks/use-units";
import { fetchJson } from "@/libs/api/fetchJson";

//料理タイプ（編集用）
type EditedDish = Pick<Dish, "isFavorite" | "imageUrl"> &
  Partial<Pick<Dish, "name" | "timeMinutes" | "servings">>;

//材料タイプ（編集用）
type EditedDishIngredient = Partial<Omit<DishIngredient, "id">>;

//レシピタイプ（編集用）
type EditedDishRecipe = Partial<Omit<DishRecipe, "id">>;

type EditModeProps = {
  isEditMode: true;
  dishId: number;
  dish: Dish;
  ingredientsForDish: DishIngredient[];
  recipesForDish: DishRecipe[];
  setIsEditMode: React.Dispatch<SetStateAction<boolean>>;
};

type CreateModeProps = {
  isEditMode: false;
  dishId?: undefined;
  dish?: undefined;
  ingredientsForDish?: undefined;
  recipesForDish?: undefined;
  setIsEditMode?: undefined;
};

type Props = EditModeProps | CreateModeProps;

const DishForm = (props: Props) => {
  const { mutateDishes } = useDishes();
  const { mutateDishIngredients } = useDishIngredients();
  const { mutateDishRecipes } = useDishRecipes();

  const { ingredients } = useIngredients();
  const { units } = useUnits();

  //モーダルスクロール用
  const { closeModal, scrollTop } = useModal();

  //料理（編集用）
  const [editedDish, setEditedDish] = useState<EditedDish>(
    props.dish
      ? props.dish
      : {
          name: "",
          timeMinutes: undefined,
          servings: undefined,
          isFavorite: false,
          imageUrl: undefined,
        }
  );

  //材料（編集用）
  const [editedDishIngredients, setEditedDishIngredients] = useState<
    EditedDishIngredient[]
  >(props.ingredientsForDish ? props.ingredientsForDish : []);

  //レシピ（編集用）
  const [editedDishRecipes, setEditedDishRecipes] = useState<
    EditedDishRecipe[]
  >(props.recipesForDish ? props.recipesForDish : []);

  //編集画像のエラー真偽
  const [editedImageIsError, setEditedImageIsError] = useState<boolean>(false);

  //セレクト用オプション（既存の材料を除く）
  const ingredientsOption = useMemo<Ingredient[]>(() => {
    return ingredients.filter(
      (i) => !editedDishIngredients.some((edi) => edi.ingredientId === i.id)
    );
  }, [ingredients, editedDishIngredients]);

  const resetEditedContent = useCallback(() => {
    setEditedDish(
      props.dish
        ? props.dish
        : {
            name: "",
            timeMinutes: undefined,
            servings: undefined,
            isFavorite: false,
            imageUrl: undefined,
          }
    );
    setEditedDishIngredients(
      props.ingredientsForDish ? props.ingredientsForDish : []
    );
    setEditedDishRecipes(props.recipesForDish ? props.recipesForDish : []);
  }, [
    props.dish,
    props.ingredientsForDish,
    props.recipesForDish,
    setEditedDish,
    setEditedDishIngredients,
    setEditedDishRecipes,
  ]);

  //登録可能か判断する
  const isDisabled = useMemo(() => {
    //チェックするキーを定義

    //料理
    if (editedDish && editedDishIngredients && editedDishRecipes) {
      const dishKeys: (keyof EditedDish)[] = [
        "name",
        "timeMinutes",
        "servings",
        "isFavorite",
      ];

      //材料：編集中かどうかでチェック内容を変える
      const dishIngredientKeys: (keyof EditedDishIngredient)[] =
        props.isEditMode ? ["dishId"] : [];

      //手順：編集中かどうかでチェック内容を変える
      const dishRecipeKeys: (keyof EditedDishRecipe)[] = props.isEditMode
        ? ["dishId", "stepNumber"]
        : ["stepNumber"];

      //料理：numberなら0（およびnull&undefined）、それ以外は空欄（およびnull&undefined）では送信させない
      const hasDishKeys = dishKeys.every((key) => {
        const value = editedDish[key];
        if (typeof value === "number") {
          return value !== 0 && value !== undefined && value !== null;
        } else {
          return value !== "" && value !== undefined && value !== null;
        }
      });

      //材料：id以外のnumberなら0（およびnull&undefined）、それ以外は空欄（およびnull&undefined）では送信させない
      const hasDishIngredientKeys =
        editedDishIngredients.length !== 0 &&
        editedDishIngredients.every((ingredient) =>
          dishIngredientKeys.every((key) => {
            const value = ingredient[key];
            if (
              key !== "dishId" &&
              key !== "ingredientId" &&
              typeof value === "number"
            ) {
              return value !== 0 && value !== undefined && value !== null;
            } else {
              return value !== "" && value !== undefined && value !== null;
            }
          })
        ) &&
        //少なくともひとつのdishIdとquantityは入力されていること
        editedDishIngredients.some(
          (ingredient) =>
            ingredient.ingredientId !== undefined &&
            ingredient.ingredientId !== null &&
            ingredient.quantity !== "" &&
            ingredient.quantity !== undefined &&
            ingredient.quantity !== null
        );

      //手順：id以外のnumberなら0（およびnull&undefined）、それ以外は空欄（およびnull&undefined）では送信させない
      const hasDishRecipeKeys =
        editedDishRecipes.length !== 0 &&
        editedDishRecipes.every((recipe) =>
          dishRecipeKeys.every((key) => {
            const value = recipe[key];
            if (key !== "dishId" && typeof value === "number") {
              return value !== 0 && value !== undefined && value !== null;
            } else {
              return value !== "" && value !== undefined && value !== null;
            }
          })
        ) &&
        //少なくともひとつのdescriptionは入力されていること
        editedDishRecipes.some(
          (ingredient) =>
            ingredient.description !== "" &&
            ingredient.description !== undefined &&
            ingredient.description !== null
        );

      return !hasDishKeys || !hasDishIngredientKeys || !hasDishRecipeKeys;
    } else {
      return true;
    }
  }, [editedDish, editedDishIngredients, editedDishRecipes, props.isEditMode]);

  //登録(POST)
  const handleSubmitCreate = async () => {
    if (
      props.isEditMode ||
      isDisabled ||
      !editedDish ||
      !editedDishIngredients ||
      !editedDishRecipes
    )
      return;

    //料理
    const newDish = {
      name: editedDish.name,
      timeMinutes: editedDish.timeMinutes,
      servings: editedDish.servings,
      isFavorite: editedDish.isFavorite,
      imageUrl: editedDish.imageUrl,
    };

    //材料
    const newDishIngredients = editedDishIngredients
      //材料と量が入力されていないものは省く
      .filter(
        (ingredient) =>
          ingredient.ingredientId !== undefined && ingredient.quantity
      )
      .map((ingredient) => ({
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
      }));

    //手順
    const newDishRecipes = editedDishRecipes
      //詳細が入力されていないものは省く
      .filter((recipe) => recipe.description)
      .map((recipe) => ({
        stepNumber: recipe.stepNumber,
        description: recipe.description,
      }));

    try {
      await fetchJson({
        url: `api/dishes`,
        method: "POST",
        body: JSON.stringify({
          dish: newDish,
          ingredients: newDishIngredients,
          recipes: newDishRecipes,
        }),
      });

      //取得
      await mutateDishes();
      await mutateDishIngredients();
      await mutateDishRecipes();
    } catch (error) {
      alert("登録に失敗しました");
      console.error(error);
    }
  };

  //編集(PUT)
  const handleSubmitEdit = async () => {
    if (
      !props.isEditMode ||
      isDisabled ||
      !editedDish ||
      !editedDishIngredients ||
      !editedDishRecipes
    )
      return;

    //料理
    const newDish = {
      name: editedDish.name,
      timeMinutes: editedDish.timeMinutes,
      servings: editedDish.servings,
      isFavorite: editedDish.isFavorite,
      imageUrl: editedDish.imageUrl ? editedDish.imageUrl : undefined,
    };

    //材料
    const newDishIngredients = editedDishIngredients
      //材料と量が入力されていないものは省く
      .filter(
        (ingredient) =>
          ingredient.ingredientId !== undefined && ingredient.quantity
      )
      .map((ingredient) => ({
        dishId: ingredient.dishId,
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
      }));

    //手順
    const newDishRecipes = editedDishRecipes
      //詳細が入力されていないものは省く
      .filter((recipe) => recipe.description !== undefined)
      .map((recipe) => ({
        dishId: recipe.dishId,
        stepNumber: recipe.stepNumber,
        description: recipe.description,
      }));

    try {
      await fetchJson({
        url: `api/dishes/${props.dishId}`,
        method: "PUT",
        body: JSON.stringify({
          dish: newDish,
          ingredients: newDishIngredients,
          recipes: newDishRecipes,
        }),
      });

      //取得
      await mutateDishes();
      await mutateDishIngredients();
      await mutateDishRecipes();
    } catch (error) {
      alert("更新に失敗しました");
      console.error(error);
    }
  };

  if (!editedDish) return;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //編集中かどうかで処理を変える
        if (props.isEditMode) {
          handleSubmitEdit();
        } else {
          handleSubmitCreate();
          closeModal();
        }

        if (props.setIsEditMode) {
          props.setIsEditMode(false);
        }
      }}
    >
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
              props.dishId ? { dishId: props.dishId } : {},
            ]);
          }}
        />
      </div>
      <h3 className="flex justify-center items-center text-xl font-bold  bg-primary py-1 mb-8">
        <span className="mr-3">手順</span>
        <span className="bg-attention text-sm text-white px-1 py-1 rounded">
          必須
        </span>
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
              props.dishId
                ? {
                    dishId: props.dishId,
                    stepNumber: editedDishRecipes.length + 1,
                  }
                : { stepNumber: editedDishRecipes.length + 1 },
            ]);
          }}
        />
      </div>
      <div className="flex gap-4 mt-8">
        {props.isEditMode ? (
          <>
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
                if (props.setIsEditMode) {
                  props.setIsEditMode(false);
                }
                resetEditedContent();
                scrollTop(0);
              }}
            />
          </>
        ) : (
          <StandardButton
            label="登録"
            variant="filled"
            color="green"
            isDisabled={isDisabled}
            className="w-full"
          />
        )}
      </div>
    </form>
  );
};

export default memo(DishForm);
