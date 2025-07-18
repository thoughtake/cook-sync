import { memo, useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import IconButton from "./common/ui/icon-button";
import { useModal } from "./context/modal-context";
import IngredientsForm from "./ingredients-form";
import {
  Ingredient,
  IngredientGroup,
  ingredientGroupColors,
  Unit,
} from "@/types";

// type Props = {
//   inputName: string;
//   setInputName: React.Dispatch<React.SetStateAction<string>>;
//   inputPrice: number | null;
//   selectedGroupId: number | null;
//   selectedUnitId: number | null;
//   selectedUnit: Unit | undefined;
//   handleSelectGroupId: (groupId: number | null) => void;
//   handleSelectUnitId: (unitId: number | null) => void;
//   handleChangePrice: (price: number | null) => void;
//   handleSubmitSave: () => void;
//   handleSubmitEdit: () => void;
//   handleEditStart: (id: number) => void;
//   handleDelete: (id: number) => void;
//   isDisabled: boolean;
//   ingredients: Ingredient[];
//   ingredientGroups: IngredientGroup[];
//   ingredientGroupColors: ingredientGroupColors[];
//   units: Unit[];
//   isEditMode: boolean;
// };

const IngredientsLists = () => {
  // const {
  //   inputName,
  //   setInputName,
  //   inputPrice,
  //   selectedGroupId,
  //   selectedUnitId,
  //   selectedUnit,
  //   handleSelectGroupId,
  //   handleSelectUnitId,
  //   handleChangePrice,
  //   handleSubmitSave,
  //   handleSubmitEdit,
  //   handleEditStart,
  //   handleDelete,
  //   isDisabled,
  //   ingredients,
  //   ingredientGroups,
  //   ingredientGroupColors,
  //   units,
  //   isEditMode,
  // } = props;

  //材料
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  //材料分類の色
  const [ingredientGroupColors, setIngredientGroupColors] = useState<
    ingredientGroupColors[]
  >([]);

  // 単位の候補
  const [units, setUnits] = useState<Unit[]>([]);

  //分類の候補
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>(
    []
  );

  //クリックされたリストのID
  const [clickedListId, setClickedListId] = useState<number | null>(null);

  //編集中の材料ID
  const [editingIngredientId, setEditingIngredientId] = useState<number | null>(
    null
  );

  //モーダルcontextを使用
  const { showModal } = useModal();

  //クリックされたリストのIDを切り替え
  const handleClickedListId = (id: number) => {
    if (id === null) return;
    if (clickedListId === id) {
      setClickedListId(null);
    } else {
      setClickedListId(id);
    }
  };

  //削除
  const handleDelete = async (id: number) => {
    if (id) {
      try {
        const res = await fetch(`/api/ingredients/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("削除に失敗しました");

        const getRes = await fetch("api/ingredients");
        const data = await getRes.json();
        setIngredients(data);
      } catch (error) {
        alert("削除に失敗しました");
        console.error(error);
      }
    }
  };

  //[初回]
  useEffect(() => {
    //材料を取得
    const fetchIngredients = async () => {
      const res = await fetch("api/ingredients");
      const data = await res.json();
      setIngredients(data);
    };
    try {
      fetchIngredients();
    } catch (err) {
      console.error("材料の取得に失敗", err);
    }

    //単位を取得
    const fetchUnits = async () => {
      const res = await fetch("/api/units");
      const data = await res.json();
      setUnits(data);
    };
    try {
      fetchUnits();
    } catch (err) {
      console.error("単位の取得に失敗", err);
    }

    //分類を取得
    const fetchIngredientGroups = async () => {
      const res = await fetch("/api/ingredient-groups");
      const result = await res.json();
      setIngredientGroups(result);
    };
    try {
      fetchIngredientGroups();
    } catch (err) {
      console.error("分類の取得に失敗", err);
    }

    //分類の色を取得
    const fetchIngredientGroupColors = async () => {
      const res = await fetch("api/ingredient-group-colors");
      const result = await res.json();
      setIngredientGroupColors(result);
    };
    try {
      fetchIngredientGroupColors();
    } catch (err) {
      console.error("分類色の取得に失敗", err);
    }
  }, []);

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
            className={`flex items-center justify-between relative h-15 mb-3 p-3 shadow-md rounded ${
              isClicked
                ? "outline-primary outline-3"
                : "outline-border outline-1"
            }`}
          >
            <button
              className={`absolute top-0 left-0 cursor-pointer w-full h-full rounded`}
              onClick={() => handleClickedListId(ingredient.id)}
            ></button>
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
                  console.log(ingredient.id);
                  setEditingIngredientId(ingredient.id);
                  showModal(<div></div>);
                }}
              />
              <IconButton
                icon={X}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(ingredient.id);
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(IngredientsLists);
