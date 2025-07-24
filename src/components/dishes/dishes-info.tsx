import { ingredients } from "@/db/schema";
import useDishIngredients from "@/hooks/useDishIngredients";
import useDishRecipes from "@/hooks/useDishRecipes";
import { Dish, DishIngredient } from "@/types";
import { Timer } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

const DishInfo = ({ dish }: { dish: Dish }) => {
  const { dishIngredients } = useDishIngredients();
  const { dishRecipes } = useDishRecipes();

  const ingredientsForDish = useMemo<DishIngredient[]>(() => {
    dishIngredients.filter((d) => d.dishId === dish.id);
  }, [dishIngredients, dish]);

  const recipesForDish = useMemo(() => {
    dishRecipes.filter((r)=>r.dishId === dish.id);
  }, [dishRecipes, dish])

  return (
    <>
      <div className="relative w-full h-70">
        {dish.imageUrl ? (
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center bg-cancel text-white w-full h-full">
            <span className="font-bold text-4xl">No Image</span>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold">{dish.name}</h2>
      <div className="flex">
        <div className="mr-1">
          <Timer />
        </div>
        <div className="font-bold">
          <span className="text-md mr-0.5">{dish.timeMinutes}</span>
          <span className="text-sm">分</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-center bg-primary py-1">
        材料
        </h3>
      <ul>
        {ingredientsForDish.map((i)=> (
          <li key={i.id}>{i.name}</li>
        )
        )}
      </ul>

    </>
  );
};

export default DishInfo;
