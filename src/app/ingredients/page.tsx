"use client";

import IngredientsForm from "@/components/IngredientsForm";
import IngredientsList from "@/components/IngredientsList";
import { Ingredient, IngredientGroup, Unit } from "@/types/index";
import { useEffect, useMemo, useRef, useState } from "react";

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

  // 材料の登録ID
  const nextId = useRef<number>(0);

  // 単位の候補
  const units: Unit[] = useMemo(
    () => [
      { id: 0, name: "個", amountPerUnit: 1 },
      { id: 1, name: "g", amountPerUnit: 100 },
    ],
    []
  );

  //分類の候補
  const ingredientGroup: IngredientGroup[] = useMemo(
    () => [
      { id: 0, name: "野菜" },
      { id: 1, name: "肉" },
      { id: 2, name: "魚介類" },
      { id: 3, name: "卵・乳製品" },
      { id: 4, name: "大豆製品・豆類" },
      { id: 5, name: "穀類・パン・麺類" },
      { id: 6, name: "調味料・香辛料" },
      { id: 7, name: "油・脂類" },
      { id: 8, name: "果物" },
      { id: 9, name: "きのこ・海藻" },
      { id: 10, name: "飲料・酒類" },
      { id: 11, name: "お菓子" },
      { id: 12, name: "その他" },
    ],
    []
  );

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
  const handleSubmitSave = () => {
    //編集モードでないこと
    if (selectedUnitId === null || selectedGroupId === null || isEditMode)
      return;

    // 新しい材料を作成
    const newIngredient = {
      id: nextId.current,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
      pricePerUnit: inputPrice !== null ? inputPrice : undefined,
    };

    //材料を更新
    setIngredients((prev) => [...prev, newIngredient]);

    //フォームの内容をリセット
    setInputName("");
    setSelectedUnitId(null);
    setSelectedGroupId(null);
    setInputPrice(null);

    //材料用のIDを+
    nextId.current++;
  };

  //フォームの送信（編集）
  const handleSubmitEdit = () => {
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
      id: editingIngredientId,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
      pricePerUnit: inputPrice !== null ? inputPrice : undefined,
    };

    //材料を更新
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === editingIngredientId ? newIngredient : ingredient
      )
    );

    //フォームの内容をリセット
    setInputName("");
    setSelectedUnitId(null);
    setSelectedGroupId(null);
    setInputPrice(null);

    //編集モードを終了
    setIsEditMode(false);
  };

  //編集モード
  const handleEditStart = (id: number) => {
    if (!isEditMode && id !== null) {
      setIsEditMode(true);
      setEditIngredientId(id);
    }
  };

  //削除
  const handleDelete = (id: number) => {
    if (id && !isEditMode) {
      const newIngredients = ingredients.filter(
        (ingredient) => ingredient.id !== id
      );
      setIngredients(newIngredients);
    }
  };

  //セレクトされている単位情報を取得
  const selectedUnit: Unit | undefined = useMemo(() => {
    return units.find((unit) => unit.id === selectedUnitId);
  }, [units, selectedUnitId]);

  //[初回]登録されている材料をストレージから取得
  useEffect(() => {
    // const stored = localStorage.getItem("ingredients");
    // if (stored) {
    const fetchIngredients = async () => {
      const res = await fetch("api/ingredients");
      const data = await res.json();
      setIngredients(data);

      const maxId =
        data.length > 0
          ? Math.max(...data.map((ingredient: Ingredient) => ingredient.id)) + 1
          : 0;
      nextId.current = maxId;
    };
    try {
      // const parsed = JSON.parse(stored);
      // setIngredients(parsed);
      fetchIngredients();
    } catch (err) {
      console.error("データの取得に失敗", err);
    }
    // }

    setIsEditMode(false);
  }, []);

  //[材料が更新された時]材料をストレージに登録
  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

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
      <h1>材料</h1>
      <IngredientsForm
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
        ingredientGroup={ingredientGroup}
        units={units}
        isEditMode={isEditMode}
        isDisabled={isDisabled}
      />
      <IngredientsList
        ingredients={ingredients}
        ingredientGroup={ingredientGroup}
        units={units}
        isEditMode={isEditMode}
        handleEditStart={handleEditStart}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default IngredientsPage;
