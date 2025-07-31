import useDishes from "@/hooks/use-dishes";
import useDishIngredients from "@/hooks/use-dish-Ingredients";
import useDishRecipes from "@/hooks/use-dish-recipes";
import useIngredients from "@/hooks/use-ingredients";
import useUnits from "@/hooks/use-units";
import { Dish, DishIngredient, DishRecipe, Ingredient } from "@/types";
import {
  BadgeJapaneseYen,
  Heart,
  Pencil,
  Plus,
  PlusIcon,
  Timer,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import IconButton from "../common/ui/button/icon-button";
import { useDeleteItemWithConfirm } from "@/libs/api/deleteItem";
import StandardButton from "../common/ui/button/standard-button";
import InputText from "../common/ui/form/input-text";
import SelectBox from "../common/ui/form/select-box";

const DishInfo = ({ dishId }: { dishId: number }) => {
  const { dishes, mutateDishes } = useDishes();
  // const dish = dishes.find((dish) => dish.id === dishId);
  const { dishIngredients } = useDishIngredients();
  const { dishRecipes } = useDishRecipes();

  const { ingredients } = useIngredients();
  const { units } = useUnits();
  const [imageIsError, setImageIsError] = useState<boolean>(false);

  //削除
  const deleteConfirm = useDeleteItemWithConfirm({
    endpoint: "api/dishes",
    mutate: mutateDishes,
  });

  //料理情報を取得
  const dish = useMemo<Dish | undefined>(() => {
    return dishes.find((dish) => dish.id === dishId);
  }, [dishes, dishId]);

  //材料を取得
  const ingredientsForDish = useMemo<DishIngredient[]>(() => {
    return dishIngredients.filter((d) => d.dishId === dish?.id);
  }, [dishIngredients, dish]);

  //レシピを取得
  const recipesForDish = useMemo<DishRecipe[]>(() => {
    return dishRecipes.filter((r) => r.dishId === dish?.id);
  }, [dishRecipes, dish]);

  /////編集/////

  //材料タイプ（編集用）
  type EditedDishIngredient = Pick<DishIngredient, "dishId"> &
    Partial<Omit<DishIngredient, "name">>;

  //レシピタイプ（編集用）
  type EditedDishRecipe = Pick<DishRecipe, "dishId"> & Partial<Omit<DishRecipe, "dishId">>;

  //編集中かどうか
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  //料理（編集用）
  const [editedDish, setEditedDish] = useState<Dish | undefined>(dish);

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


  // const isDishLoaded = () => {
  //   return (
  //     dish && ingredientsForDish.length !== 0 && recipesForDish.length !== 0
  //   );
  // };

  //1人前あたりの相場を計算
  const pricePerServing = useMemo<number | null>(() => {
    if (
      ingredientsForDish.length === 0 ||
      ingredients.length === 0 ||
      units.length === 0 ||
      !dish?.servings
    )
      return null;

    const totalPrice = ingredientsForDish.reduce((acc, ifd) => {
      const ingredient = ingredients.find((i) => i.id === ifd.ingredientId);
      if (!ingredient) return acc;

      const pricePerUnit = ingredient.pricePerUnit;
      const amountPerUnit = units.find(
        (unit) => unit.id === ingredient.unitId
      )?.amountPerUnit;

      if (ifd.quantity && amountPerUnit) {
        const price = (pricePerUnit * parseFloat(ifd.quantity)) / amountPerUnit;
        return acc + price;
      }

      return acc;
    }, 0);

    return Math.round(totalPrice / dish.servings);
  }, [ingredientsForDish, ingredients, units, dish]);

  // const isEditedDishLoaded = () => {
  //   return (
  //     !editedDish &&
  //     editedDishIngredients.length !== 0 &&
  //     editedDishRecipes.length !== 0
  //   );
  // };

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

  //お気に入り登録
  const handleClickFavorite = async () => {
    if (!dish) return;
    const newFavorite = { ...dish, isFavorite: !dish.isFavorite };

    try {
      const res = await fetch(`api/dishes/${dish.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFavorite),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "更新に失敗しました");
      }

      //取得
      await mutateDishes();
    } catch (err) {
      alert("更新に失敗しました");
      console.error(err);
    }
  };

  if (!dish || !editedDish) return;

  return (
    <>
      {/* 編集中かどうかで分岐 */}
      {isEditMode ? (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative w-full h-70 mb-3">
              {editedDish.imageUrl && !editedImageIsError ? (
                <Image
                  src={editedDish.imageUrl}
                  alt={editedDish.name}
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
                editedDish.timeMinutes ? String(editedDish.timeMinutes) : ""
              }
              isRequired={true}
              onChange={(e) => {
                setEditedDish({
                  ...editedDish,
                  timeMinutes: Number(e.target.value),
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
                  servings: Number(e.target.value),
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
                        const newIngredients = editedDishIngredients.map((ingredient, i) =>
                          i === index
                            ? { ...ingredient, ingredientId: Number(value) }
                            : ingredient
                        );
                        setEditedDishIngredients(newIngredients);
                      }}
                      options={[
                        ...(targetIngredient ? [{id: targetIngredient.id, name: targetIngredient.name}] : []),
                        ...ingredientsOption.map((ingredient) => ({
                        id: ingredient.id,
                        name: ingredient.name,
                      }))
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
                              const isValid = /^\d+(\.\d{0,2})?$/.test(e.target.value)
                              if (isValid) {
                                const newIngredients = editedDishIngredients.map(
                                  (ingredient, i) =>
                                    i === index
                                      ? { ...ingredient, quantity: e.target.value }
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
                          const newIngredients = [...editedDishIngredients]
                          newIngredients.splice(index,1)
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
                <li
                  key={index}
                  className="flex border-b border-border text-xl py-8"
                >
                  <div className="w-13">
                    <span className="flex justify-center items-center bg-primary w-8 h-8 font-bold rounded-full">
                      {edr.stepNumber}
                    </span>
                  </div>
                  <p className="flex-1">{edr.description}</p>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <StandardButton
                label="編集"
                variant="filled"
                color="green"
                isDisabled={true}
                className="flex-1"
              />
              <StandardButton
                label="キャンセル"
                variant="filled"
                color="gray"
                className="flex-1"
                onClick={() => {
                  setIsEditMode(false);
                  resetEditedContent();
                }}
              />
            </div>
          </form>
        </>
      ) : (
        ///////////////////
        // 編集中でない場合
        ///////////////////
        <>
          <div className="relative w-full h-70">
            {dish.imageUrl && !imageIsError ? (
              <Image
                src={dish.imageUrl}
                alt={dish.name}
                fill
                className="object-contain"
                onError={() => setImageIsError(true)}
              />
            ) : (
              <div className="flex items-center justify-center bg-cancel text-white w-full h-full">
                <span className="font-bold text-4xl">No Image</span>
              </div>
            )}
          </div>
          {/* タイトル */}
          <h2 className="text-3xl font-bold text-center mt-5 mb-3">
            {dish.name}
          </h2>
          <div className="flex justify-between items-center">
            {/* 左側 */}
            <div>
              {/* 所要時間 */}
              <div className="flex items-center">
                <div className="mr-2 pb-2">
                  <Timer className="w-8 h-8" />
                </div>
                <div className="font-bold mr-2 text-lg">所要時間</div>
                <div className="font-bold pb-2">
                  <span className="text-3xl mr-1">{dish.timeMinutes}</span>
                </div>
                <div className="font-bold text-lg">分</div>
              </div>
              {/* 分量 */}
              <div className="flex items-center">
                <div className="mr-2 pb-2">
                  <Users className="w-8 h-8" />
                </div>
                <div className="font-bold mr-2 text-lg">分量</div>
                <div className="font-bold pb-2">
                  <span className="text-3xl mr-1">{dish.servings}</span>
                </div>
                <div className="font-bold text-lg">人前</div>
              </div>
              {/* 1人前あたりの相場 */}
              <div className="flex items-center mb-5">
                <div className="mr-2 pb-2">
                  <BadgeJapaneseYen className="w-8 h-8" />
                </div>
                <div className="font-bold mr-2 text-lg">1人前あたりの相場</div>
                <div className="font-bold pb-2">
                  <span className="text-3xl mr-1">{pricePerServing}</span>
                </div>
                <div className="font-bold text-lg">円</div>
              </div>
            </div>

            {/* 右側 */}
            <div>
              {/* お気に入り */}
              <button
                className="flex border rounded p-3 cursor-pointer"
                onClick={handleClickFavorite}
              >
                <div className="mr-2">お気に入り</div>
                {dish.isFavorite ? (
                  <Heart fill="red" color="red" />
                ) : (
                  <Heart color="gray" />
                )}
              </button>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center bg-primary py-1 mb-3">
            材料
          </h3>
          <ul>
            {ingredientsForDish.map((ifd) => {
              const targetIngredient = ingredients.find(
                (ingredient) => ifd.ingredientId === ingredient.id
              );
              const targetUnit = units.find(
                (unit) => targetIngredient?.unitId === unit.id
              );

              return (
                targetUnit && (
                  <li
                    key={ifd.id}
                    className="flex justify-between border-b border-border text-xl py-3"
                  >
                    <div>{targetIngredient?.name}</div>
                    <div>
                      <span>{parseFloat(ifd.quantity)}</span>
                      <span>{targetUnit?.name}</span>
                    </div>
                  </li>
                )
              );
            })}
          </ul>
          <h3 className="text-xl font-bold text-center bg-primary py-1 mb-3 mt-10">
            手順
          </h3>
          <ul>
            {recipesForDish.map((rfd) => (
              <li
                key={rfd.id}
                className="flex border-b border-border text-xl py-8"
              >
                <div className="w-13">
                  <span className="flex justify-center items-center bg-primary w-8 h-8 font-bold rounded-full">
                    {rfd.stepNumber}
                  </span>
                </div>
                <p className="flex-1">{rfd.description}</p>
              </li>
            ))}
          </ul>
          <div className="text-right mt-10">
            <IconButton
              icon={Pencil}
              className="mr-3"
              variant="filled"
              size="md"
              radius="circle"
              onClick={() => {
                setIsEditMode(true);
              }}
            />
            <IconButton
              icon={Trash2}
              variant="filled"
              size="md"
              radius="circle"
              color="red"
              onClick={() => {
                deleteConfirm({ id: dishId, name: dish.name });
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DishInfo;
