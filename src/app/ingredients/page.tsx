"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { useModal } from "@/context/modal-context";
import IconButton from "@/components/common/ui/button/icon-button";
import IngredientsForm from "@/components/ingredients/ingredients-form";
import ModalConfirm from "@/components/common/ui/modal/modal-confirm";
import clsx from "clsx";
import useIngredients from "@/hooks/useIngredients";
import useIngredientGroups from "@/hooks/useIngredientGroups";
import useUnits from "@/hooks/useUnits";
import useIngredientGroupColors from "@/hooks/useIngredientGroupColors";

const IngredientsPage = () => {
  const { ingredients, mutateIngredients } = useIngredients();
  const { ingredientGroups } = useIngredientGroups();
  const { ingredientGroupColors } = useIngredientGroupColors();
  const { units } = useUnits();

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
        // const result = await res.json();

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "削除に失敗しました");
        }

        //GET
        await mutateIngredients();
      } catch (err) {
        alert("削除に失敗しました");
        console.error("削除エラー：", err, "ID：", id);
      }
    }
  };

  //削除確認
  const handleDeleteConfirm = ({ id, name }: { id: number; name: string }) => {
    showModal(
      <ModalConfirm
        message={`${name} を削除してよろしいですか？`}
        onConfirm={() => handleDelete(id)}
      />
    );
  };

  return (
    <ul className="py-5">
      {ingredients.map((ingredient) => {
        const groupName = ingredientGroups.find(
          (group) => group.id === ingredient.ingredientGroupId
        )?.name;
        const groupColor = ingredientGroupColors.find(
          (color) => color.ingredientGroupId === ingredient.ingredientGroupId
        )?.colorCode;
        const unit = units.find(
          (unit) => unit.id === ingredient.unitId
        );
        const isClicked = ingredient.id === clickedListId;

        return (
          <li
            key={ingredient.id}
            className={clsx(
              "flex items-center justify-between relative h-15 mb-3 p-3 shadow-md rounded",
              {
                "outline-primary outline-3": isClicked,
                "outline-border outline-1": !isClicked,
              }
            )}
          >
            <button
              className={`absolute top-0 left-0 cursor-pointer w-full h-full rounded z-2 ${
                isClicked ? "pointer-events-none" : "pointer-events-auto"
              }`}
              onClick={() => handleClickedListId(ingredient.id)}
            ></button>
            <div className="flex items-center">
              {/* 材料名 */}
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
                  `${unit?.amountPerUnit}${unit?.name}あたり${ingredient.pricePerUnit}円`}
              </div>
            </div>
            {/* ボタン */}
            <div
              className={clsx("flex items-center", {
                visible: isClicked,
                hidden: !isClicked,
              })}
            >
              <IconButton
                icon={Pencil}
                className="mr-3"
                variant="filled"
                size="sm"
                radius="circle"
                onClick={(e) => {
                  e.stopPropagation();
                  showModal(<IngredientsForm targetId={ingredient.id} />);
                }}
              />
              <IconButton
                icon={X}
                variant="filled"
                size="sm"
                radius="circle"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteConfirm({
                    id: ingredient.id,
                    name: ingredient.name,
                  });
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
