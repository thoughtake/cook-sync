"use client";

import { Unit } from "@/types/index";
import { useCallback, useEffect, useMemo, useState } from "react";
import InputText from "../common/ui/form/input-text";
import StandardButton from "../common/ui/button/standard-button";
import { useModal } from "../../context/modal-context";
import useIngredients from "@/hooks/use-ingredients";
import useIngredientGroups from "@/hooks/use-ingredient-groups";
import useUnits from "@/hooks/use-units";
import SelectBox from "../common/ui/form/select-box";
import { fetchJson } from "@/libs/api/fetchJson";

type Props = {
  targetId: number | null;
};

const IngredientsForm = (props: Props) => {
  const { targetId } = props;
  const { ingredients, mutateIngredients } = useIngredients();
  const { ingredientGroups } = useIngredientGroups();
  const { units } = useUnits();

  //[input]材料名
  const [inputName, setInputName] = useState<string>("");

  //[select]単位
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  //[select]分類
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  //[input]相場
  const [inputPrice, setInputPrice] = useState<number | null>(null);

  //[select]単位の状態を変更
  const handleSelectUnitId = (unitId: number | null) => {
    setSelectedUnitId(unitId);
  };

  //[select]分類の状態を変更
  const handleSelectGroupId = (groupId: number | null) => {
    setSelectedGroupId(groupId);
  };

  //[input]相場の状態を変更
  const handleChangePrice = (price: number | null) => {
    setInputPrice(price);
  };

  //モーダルcontext使用
  const { closeModal } = useModal();

  //targetIdの有無で、編集中かどうかを判断する
  const isEditMode = targetId !== null;

  //対象の食材を取得
  const editTarget = useMemo(() => {
    if (isEditMode && ingredients.length > 0) {
      return ingredients.find((i) => i.id === targetId);
    }
  }, [isEditMode, targetId, ingredients]);

  // フォームを送れる状態かどうか
  const isDisabled: boolean = useMemo(() => {
    return (
      // [input]材料名が入っているか
      !inputName.trim() ||
      // [select]単位が選ばれているか
      selectedUnitId === null ||
      // [select]分類が選ばれているか
      selectedGroupId === null ||
      // [input]相場が入力されているか
      inputPrice === null
    );
  }, [inputName, selectedUnitId, selectedGroupId, inputPrice]);

  //セレクトされている単位情報を取得
  const selectedUnit: Unit | undefined = useMemo(() => {
    return units.find((unit) => unit.id === Number(selectedUnitId));
  }, [units, selectedUnitId]);

  //単位の文言を変更する際に使用
  const unitLabel = selectedUnit
    ? `${selectedUnit.amountPerUnit}${selectedUnit.name}`
    : "1単位";

  //フォームの内容をリセット
  const resetForm = useCallback(() => {
    setInputName("");
    setSelectedUnitId(null);
    setSelectedGroupId(null);
    setInputPrice(null);
  }, [setInputName, setSelectedUnitId, setSelectedGroupId, setInputPrice]);

  // 編集時にフォームに編集対象の情報を初期値としてセット
  useEffect(() => {
    if (editTarget) {
      setInputName(editTarget.name);
      setSelectedGroupId(editTarget.ingredientGroupId);
      setSelectedUnitId(editTarget.unitId);
      setInputPrice(editTarget.pricePerUnit ?? null);
    }
  }, [editTarget]);

  //フォームの送信（新規登録）
  const handleSubmitCreate = async () => {
    //編集モードでないこと
    if (selectedUnitId === null || selectedGroupId === null || isEditMode)
      return;

    // 新しい材料を作成
    const newIngredient = {
      name: inputName,
      ingredientGroupId: Number(selectedGroupId),
      unitId: Number(selectedUnitId),
      pricePerUnit: inputPrice,
    };

    try {
      await fetchJson({
        url: "/api/ingredients",
        method: "POST",
        body: JSON.stringify(newIngredient),
      });

      //取得
      await mutateIngredients();

      closeModal();
      resetForm();
    } catch (error) {
      alert("登録に失敗しました");
      console.error(error);
    }
  };

  //フォームの送信（編集）
  const handleSubmitEdit = async () => {
    //編集モードであること
    if (
      selectedUnitId === null ||
      selectedGroupId === null ||
      targetId === null
    )
      return;

    // 新しい材料を作成
    const newIngredient = {
      name: inputName,
      ingredientGroupId: Number(selectedGroupId),
      unitId: Number(selectedUnitId),
      pricePerUnit: inputPrice,
    };

    try {
      const res = await fetch(`/api/ingredients/${targetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "更新に失敗しました");
      }

      //取得
      await mutateIngredients();

      closeModal();
      resetForm();
    } catch (error) {
      alert("更新に失敗しました");
      console.error(error);
    }
  };

  const handleClickCancel = () => {
    closeModal();
    resetForm();
  };

  return (
    // フォーム
    <>
      <h2 className="text-center text-xl font-bold">{`材料を${
        isEditMode ? "編集" : "登録"
      }`}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          //編集IDがあるかどうかで処理をかえる
          if (isEditMode) {
            handleSubmitEdit();
          } else {
            handleSubmitCreate();
          }
        }}
        className="mb-5"
      >
        {/* [input]材料名 */}
        <InputText
          name="ingredient"
          label="材料名"
          value={inputName}
          isRequired={true}
          onChange={(e) => setInputName(e.target.value)}
        />

        {/* [select]分類 */}
        <SelectBox
          name="group"
          label="分類"
          value={selectedGroupId ? String(selectedGroupId) : ""}
          isRequired={true}
          onChange={(value) => {
            handleSelectGroupId(value ? Number(value) : null);
          }}
          options={ingredientGroups}
        />

        {/* [select]単位 */}
        <SelectBox
          name="unit"
          label="単位"
          value={selectedUnitId ? String(selectedUnitId) : ""}
          isRequired={true}
          onChange={(value) => {
            handleSelectUnitId(value ? Number(value) : null);
          }}
          options={units}
        />

        {/* [input]相場 */}
        {/* 単位が選ばれたら表示する */}
        <div className={`${selectedUnitId === null ? "invisible" : "visible"}`}>
          <InputText
            name="相場"
            label={`${unitLabel}あたりの相場`}
            value={inputPrice ? String(inputPrice) : ""}
            isRequired={true}
            onChange={(e) => {
              const value = e.target.value;
              //半角数字以外は入力を受け付けない
              if (/^[0-9]*$/.test(value)) {
                if (value === "") {
                  handleChangePrice(null);
                } else {
                  handleChangePrice(Number(value));
                }
              }
            }}
            suffix="円"
            className="w-1/3 text-right"
          />
        </div>

        {/* 送信ボタン */}
        <div>
          {isEditMode ? (
            <div className="flex gap-4">
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
                onClick={handleClickCancel}
              />
            </div>
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
    </>
  );
};

export default IngredientsForm;
