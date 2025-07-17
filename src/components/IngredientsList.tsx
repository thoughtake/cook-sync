import { Ingredient, IngredientGroup, Unit } from "@/types/index";
import { memo } from "react";

type Props = {
  ingredients: Ingredient[];
  ingredientGroups: IngredientGroup[];
  units: Unit[];
  isEditMode: boolean;
  handleEditStart: (id: number) => void;
  handleDelete: (id: number) => void;
};

const IngredientsList = (props: Props) => {
  const {
    ingredients,
    ingredientGroups,
    units,
    isEditMode,
    handleEditStart,
    handleDelete,
  } = props;

  return (
    <ul>
      {ingredients.map((ingredient) => {
        const groupName = ingredientGroups.find(
          (group) => group.id === ingredient.ingredientGroupId
        )?.name;
        const unitName = units.find(
          (unit) => unit.id === ingredient.unitId
        )?.name;

        return (
          <li key={ingredient.id}>
            {ingredient.id}
            <span>{ingredient.name}</span>
            <span>{groupName}</span>
            <span>{unitName}</span>
            <span>
              {ingredient.pricePerUnit &&
                `1${unitName}あたり${ingredient.pricePerUnit}円`}
            </span>
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
