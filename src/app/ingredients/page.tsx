"use client";

import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import {
  Ingredient,
  IngredientGroup,
  ingredientGroupColors,
  Unit,
} from "@/types";
import { useModal } from "@/components/context/modal-context";
import IconButton from "@/components/common/ui/button/icon-button";
import IngredientsForm from "@/components/common/ui/ingredients/ingredients-form";
import ModalConfirm from "@/components/common/ui/modal/modal-confirm";

const IngredientsPage = () => {
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

  //モーダルcontextを使用
  const { showModal } = useModal();

  //クリックされたリストのIDを切り替え
  const handleClickedListId = (id: number) => {
    if (id === null || clickedListId === id) return;
    setClickedListId(id);
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

  //削除確認
  const handleDeleteConfirm = ({id, name}:{id: number, name: string}) => {
    showModal(
      <ModalConfirm 
        message={`${name} を削除してよろしいですか？`}
        onConfirm={() => handleDelete(id)}
      />
    )
  }

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
              className={`absolute top-0 left-0 cursor-pointer w-full h-full rounded ${
                isClicked ? "pointer-events-none" : "pointer-events-auto"
              }`}
              onClick={() => handleClickedListId(ingredient.id)}
            ></button>
            <div className="flex items-center">
              {/* 食材名 */}
              <div className="text-xl font-bold mr-4">{ingredient.name}</div>
              {/* 分類 */}
              <div
                style={{
                  backgroundColor: `${groupColor ? groupColor : "inherit"}`,
                }}
                className="px-3 py-1 rounded mr-4"
              >
                {groupName}
              </div>
              {/* 相場 */}
              <div>
                {ingredient.pricePerUnit &&
                  `1${unitName}あたり${ingredient.pricePerUnit}円`}
              </div>
            </div>
            {/* ボタン */}
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
                  showModal(
                    <IngredientsForm
                      targetId={ingredient.id}
                      ingredients={ingredients}
                      setIngredients={setIngredients}
                      // setClickedListId={setClickedListId}
                      ingredientGroups={ingredientGroups}
                      units={units}
                    />
                  );
                }}
              />
              <IconButton
                icon={X}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteConfirm({id: ingredient.id, name: ingredient.name});
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientsPage;
