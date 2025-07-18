"use client";

import IngredientsList from "@/components/Ingredients-lists";
import { Ingredient, IngredientGroup, ingredientGroupColors, Unit } from "@/types/index";
import { useEffect, useMemo, useState } from "react";

const IngredientsPage = () => {
  //材料
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  //[input]材料名
  const [inputName, setInputName] = useState<string>("");

  //[select]単位
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  //[select]分類
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  //[input]相場
  const [inputPrice, setInputPrice] = useState<number | null>(null);

  //編集中かどうか
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  //編集中の材料ID
  const [editingIngredientId, setEditIngredientId] = useState<number | null>(
    null
  );

  // 単位の候補
  const [units, setUnits] = useState<Unit[]>([]);

  //分類の候補
  const [ingredientGroups, setIngredientGroups] = useState<IngredientGroup[]>([]);

  const [ingredientGroupColors, setIngredientGroupColors] = useState<ingredientGroupColors[]>([]);

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

  // フォームを送れる状態かどうか
  const isDisabled: boolean = useMemo(() => {
    return (
      // [input]材料名が入っているか
      !inputName.trim() ||
      // [select]単位が選ばれているか
      selectedUnitId === null ||
      // [select]分類が選ばれているか
      selectedGroupId === null
    );
  }, [inputName, selectedUnitId, selectedGroupId]);

  //フォームの送信（保存）
  const handleSubmitSave = async () => {
    //編集モードでないこと
    if (selectedUnitId === null || selectedGroupId === null || isEditMode)
      return;

    // 新しい材料を作成
    const newIngredient = {
      // id: nextId.current,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
      pricePerUnit: inputPrice !== null ? inputPrice : undefined,
    };

    try {
      const res = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "登録に失敗しました。");
      }

      const getRes = await fetch("api/ingredients");
      const data = await getRes.json();
      setIngredients(data);

      //フォームの内容をリセット
      setInputName("");
      setSelectedUnitId(null);
      setSelectedGroupId(null);
      setInputPrice(null);
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
      !isEditMode ||
      editingIngredientId === null
    )
      return;

    // 新しい材料を作成
    const newIngredient = {
      // id: editingIngredientId,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
      pricePerUnit: inputPrice !== null ? inputPrice : undefined,
    };

    try {
      const res = await fetch(`/api/ingredients/${editingIngredientId}`, {
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

      const getRes = await fetch("api/ingredients");
      const data = await getRes.json();
      setIngredients(data);

      //フォームの内容をリセット
      setInputName("");
      setSelectedUnitId(null);
      setSelectedGroupId(null);
      setInputPrice(null);

      //編集モードを終了
      setIsEditMode(false);
    } catch (error) {
      alert("更新に失敗しました");
      console.error(error);
    }
  };

  //編集モード
  const handleEditStart = (id: number) => {
    if (!isEditMode && id !== null) {
      setIsEditMode(true);
      setEditIngredientId(id);
    }
  };

  //削除
  const handleDelete = async (id: number) => {
    if (id && !isEditMode) {
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

  //セレクトされている単位情報を取得
  const selectedUnit: Unit | undefined = useMemo(() => {
    return units.find((unit) => unit.id === selectedUnitId);
  }, [units, selectedUnitId]);


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
    const fectchUnits = async () => {
      const res = await fetch('/api/units');
      const data = await res.json();
      setUnits(data);
    };
    try {
      fectchUnits();
    } catch (err) {
      console.error("単位の取得に失敗", err);
    }

    //分類を取得
    const fetchIngredientGroups = async () => {
      const res = await fetch('/api/ingredient-groups');
      const result = await res.json();
      setIngredientGroups(result);
    }
    try {
      fetchIngredientGroups();
    } catch (err) {
      console.error("分類の取得に失敗", err);
    }

    //分類の色を取得
    const fetchIngredientGroupColors = async () => {
      const res = await fetch('api/ingredient-group-colors');
      const result = await res.json();
      setIngredientGroupColors(result);
    }
    try {
      fetchIngredientGroupColors();
    } catch (err) {
      console.error("分類色の取得に失敗", err);
    }

    setIsEditMode(false);
  }, []);

  //編集時にフォームに編集対象の情報を初期値としてセット
  useEffect(() => {
    if (isEditMode && editingIngredientId !== null) {
      const editTarget = ingredients.find((i) => i.id === editingIngredientId);
      if (editTarget) {
        setInputName(editTarget.name);
        setSelectedGroupId(editTarget.ingredientGroupId);
        setSelectedUnitId(editTarget.unitId);
        setInputPrice(editTarget.pricePerUnit ?? null);
      }
    } else {
      setInputName("");
      setSelectedGroupId(null);
      setSelectedUnitId(null);
      setInputPrice(null);
    }
  }, [isEditMode, editingIngredientId, ingredients]);

  return (
    <>
      {/* <IngredientsForm
        inputName={inputName}
        inputPrice={inputPrice}
        setInputName={setInputName}
        selectedGroupId={selectedGroupId}
        selectedUnitId={selectedUnitId}
        selectedUnit={selectedUnit}
        handleSubmitSave={handleSubmitSave}
        handleSubmitEdit={handleSubmitEdit}
        handleSelectGroupId={handleSelectGroupId}
        handleSelectUnitId={handleSelectUnitId}
        handleChangePrice={handleChangePrice}
        ingredientGroups={ingredientGroups}
        units={units}
        isEditMode={isEditMode}
        isDisabled={isDisabled}
      /> */}
      <IngredientsList
        inputName={inputName}
        inputPrice={inputPrice}
        setInputName={setInputName}
        selectedGroupId={selectedGroupId}
        selectedUnitId={selectedUnitId}
        selectedUnit={selectedUnit}
        handleSubmitSave={handleSubmitSave}
        handleSubmitEdit={handleSubmitEdit}
        handleSelectGroupId={handleSelectGroupId}
        handleSelectUnitId={handleSelectUnitId}
        handleChangePrice={handleChangePrice}
        handleEditStart={handleEditStart}
        handleDelete={handleDelete}
        isDisabled={isDisabled}
        ingredients={ingredients}
        ingredientGroups={ingredientGroups}
        ingredientGroupColors = {ingredientGroupColors}
        units={units}
        isEditMode={isEditMode}
      />
    </>
  );
};

export default IngredientsPage;
