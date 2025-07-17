import {
  Ingredient,
  IngredientGroup,
  ingredientGroupColors,
  Unit,
} from "@/types/index";
import { memo, useState } from "react";

type Props = {
  ingredients: Ingredient[];
  ingredientGroups: IngredientGroup[];
  ingredientGroupColors: ingredientGroupColors[];
  units: Unit[];
  isEditMode: boolean;
  handleEditStart: (id: number) => void;
  handleDelete: (id: number) => void;
};

const IngredientsList = (props: Props) => {
  const {
    ingredients,
    ingredientGroups,
    ingredientGroupColors,
    units,
    isEditMode,
    handleEditStart,
    handleDelete,
  } = props;

  const [clickedListId, setClickedListId] = useState<number | null>(null);

  const handleClickedListId = (id: number) => {
    if (id === null) return;
    if (clickedListId === id) {
      setClickedListId(null)
    } else {
      setClickedListId(id);
    }
  }

  return (
    <ul className="pt-5 pb-5">
      {ingredients.map((ingredient) => {
        const groupName = ingredientGroups.find(
          (group) => group.id === ingredient.ingredientGroupId
        )?.name;
        const groupColor = ingredientGroupColors.find(
          (color) => color.ingredientGroupId === ingredient.ingredientGroupId
        )?.colorCode;
        const unitName = units.find(
          (unit) => unit.id === ingredient.unitId
        )?.name;
        const isClicked:boolean = ingredient.id === clickedListId;

        return (
          <li key={ingredient.id} onClick={() => handleClickedListId(ingredient.id)} className={`flex items-center w-full shadow-md mb-3 h-15 p-3  rounded ${isClicked ? "border-primary border-3" : "border-border border-1"} cursor-pointer`}>
            <div className="text-xl font-bold mr-4">{ingredient.name}</div>
            <div
              style={{
                backgroundColor: `${groupColor ? groupColor : "inherit"}`,
              }}
              className="px-3 py-1 rounded mr-4"
            >
              {groupName}
            </div>
            <div>
              {ingredient.pricePerUnit &&
                `1${unitName}あたり${ingredient.pricePerUnit}円`}
            </div>
            <button
              onClick={() => handleEditStart(ingredient.id)}
              className={`bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer font-bold ${
                isEditMode ? "hidden" : "visible"
              }`}
            >
              編集
            </button>
            <button
              onClick={() => handleDelete(ingredient.id)}
              className={`bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer font-bold ${
                isEditMode ? "hidden" : "visible"
              }`}
            >
              削除
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(IngredientsList);
