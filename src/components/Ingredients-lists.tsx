import { memo, useState } from "react";
import { Pencil, X } from "lucide-react";
import IconButton from "./common/ui/icon-button";
import { useModal } from "./context/modal-context";
import IngredientsForm from "./ingredients-form";
import { Ingredient, IngredientGroup, ingredientGroupColors, Unit } from "@/types";

type Props = {
  inputName: string;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  inputPrice: number | null;
  selectedGroupId: number | null;
  selectedUnitId: number | null;
  selectedUnit: Unit | undefined;
  handleSelectGroupId: (groupId: number | null) => void;
  handleSelectUnitId: (unitId: number | null) => void;
  handleChangePrice: (price: number | null) => void;
  handleSubmitSave: () => void;
  handleSubmitEdit: () => void;
  handleEditStart: (id: number) => void;
  handleDelete: (id: number) => void;
  isDisabled: boolean;
  ingredients: Ingredient[];
  ingredientGroups: IngredientGroup[];
  ingredientGroupColors: ingredientGroupColors[];
  units: Unit[];
  isEditMode: boolean;
};


const IngredientsLists = (props: Props) => {

  const {
  inputName,
  setInputName,
  inputPrice,
  selectedGroupId,
  selectedUnitId,
  selectedUnit,
  handleSelectGroupId,
  handleSelectUnitId,
  handleChangePrice,
  handleSubmitSave,
  handleSubmitEdit,
  handleEditStart,
  handleDelete,
  isDisabled,
  ingredients,
  ingredientGroups,
  ingredientGroupColors,
  units,
  isEditMode,
  } = props;

  const [clickedListId, setClickedListId] = useState<number | null>(null);

  const handleClickedListId = (id: number) => {
    if (id === null) return;
    if (clickedListId === id) {
      setClickedListId(null);
    } else {
      setClickedListId(id);
    }
  };

  const { showModal } = useModal();

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
        const isClicked: boolean = ingredient.id === clickedListId;

        return (
          <li
            key={ingredient.id}
            className={`mb-3 shadow-md  rounded ${
              isClicked
                ? "outline-primary outline-3"
                : "outline-border outline-1"
            }`}
          >
            <div
              role="button"
              tabIndex={0}
              className={`flex items-center justify-between cursor-pointer w-full h-15 p-3 rounded`}
              onClick={() => handleClickedListId(ingredient.id)}
            >
              <div className="flex items-center">
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
              </div>
              <div
                className={`flex items-center ${
                  isClicked ? "visible" : "hidden"
                }`}
              >
                <IconButton
                  icon={Pencil}
                  className="mr-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditStart(ingredient.id);
                    showModal(<IngredientsForm 
                      inputName={inputName}
                      inputPrice={inputPrice}
                      setInputName={setInputName}
                      selectedGroupId={selectedGroupId}
                      selectedUnitId={selectedUnitId}
                      selectedUnit={selectedUnit}
                      handleSelectGroupId={handleSelectGroupId}
                      handleSelectUnitId={handleSelectUnitId}
                      handleChangePrice={handleChangePrice}
                      handleSubmitSave={handleSubmitSave}
                      handleSubmitEdit={handleSubmitEdit}
                      ingredientGroups={ingredientGroups}
                      units={units}
                      isEditMode={isEditMode}
                      isDisabled={isDisabled}
                    />);
                  }}
                  isEditMode={isEditMode}
                />
                <IconButton
                  icon={X}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(ingredient.id);
                  }}
                  isEditMode={isEditMode}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(IngredientsLists);
