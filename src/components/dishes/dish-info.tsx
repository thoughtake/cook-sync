import useDishes from "@/hooks/use-dishes";
import useDishIngredients from "@/hooks/use-dish-ingredients";
import useDishRecipes from "@/hooks/use-dish-recipes";
import useIngredients from "@/hooks/use-ingredients";
import useUnits from "@/hooks/use-units";
import { Dish, DishIngredient, DishRecipe } from "@/types";
import {
  BadgeJapaneseYen,
  Heart,
  Pencil,
  Timer,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import IconButton from "../common/ui/button/icon-button";
import { useDeleteItemWithConfirm } from "@/libs/api/delete-item";
import DishForm from "./dish-form";
import { useModal } from "@/context/modal-context";
import { fetchJson } from "@/libs/api/fetch-json";

const DishInfo = ({ dishId }: { dishId: number }) => {
  const { dishes, mutateDishes } = useDishes();
  const { dishIngredients } = useDishIngredients();
  const { dishRecipes } = useDishRecipes();

  const { ingredients } = useIngredients();
  const { units } = useUnits();
  const [imageIsError, setImageIsError] = useState<boolean>(false);

  //モーダルスクロール用
  const { scrollTop } = useModal();

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

  //編集中かどうか
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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

  //お気に入り登録
  const handleClickFavorite = async () => {
    if (!dish) return;
    const newFavorite = { ...dish, isFavorite: !dish.isFavorite };

    try {
      await fetchJson({
        url: `api/dishes/${dish.id}/favorite`,
        method: "PUT",
        body: JSON.stringify(newFavorite),
      });

      //取得
      await mutateDishes();
    } catch (err) {
      alert("更新に失敗しました");
      console.error(err);
    }
  };

  if (!dish) return;

  return (
    <>
      {/* 編集中かどうかで分岐 */}
      {isEditMode ? (
        <DishForm
          dishId={dishId}
          dish={dish}
          ingredientsForDish={ingredientsForDish}
          recipesForDish={recipesForDish}
          // units={units}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
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
                    className="flex justify-between border-b border-border  py-3"
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
              <li key={rfd.id} className="flex border-b border-border py-8">
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
                scrollTop(0);
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
