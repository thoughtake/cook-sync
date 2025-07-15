"use client";

import IngredientForm from "@/components/IngredientForm";
import { Ingredient, IngredientGroup, Unit } from "@/types/indes";
import { useEffect, useRef, useState } from "react";

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [inputName, setInputName] = useState<string>("");
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [inputPrice, setInputPrice] = useState<string>("");

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editIngredientId, setEditIngredientId] = useState<number | null>(null);

  const nextId = useRef<number>(0);

  const units: Unit[] = [
    { id: 0, name: "個" },
    { id: 1, name: "g" },
  ];

  const ingredientGroup: IngredientGroup[] = [
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
  ];

  const handleSelectUnitId = (unitId: number) => {
    setSelectedUnitId(unitId);
  };

  const handleSelectGroupId = (groupId: number) => {
    setSelectedGroupId(groupId);
  };

  const handleChangePrice = (price: string) => {
    if (/^[0-9]*$/.test(price)) {
      setInputPrice(price);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !inputName.trim() ||
      selectedUnitId === null ||
      selectedGroupId === null ||
      isEditMode
    )
      return;
    const newIngredient = {
      id: nextId.current,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
      pricePerUnit: inputPrice ? Number(inputPrice) : undefined,
    };
    setIngredients((prev) => [...prev, newIngredient]);
    setInputName("");
    setSelectedUnitId(null);
    setSelectedGroupId(null);
    setInputPrice("");
    nextId.current++;
  };

  const handleEditStart = (id: number) => {
    if (!isEditMode && id !== null) {
      setIsEditMode(true);
      setEditIngredientId(id);
    }
    console.log(isEditMode)
    console.log(editIngredientId)
  };

  const handleDelete = (id: number) => {
    if (id && !isEditMode) {
      const newIngredients = ingredients.filter(
        (ingredient) => ingredient.id !== id
      );
      setIngredients(newIngredients);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("ingredients");
    if (stored) {
      try {
        setIngredients(JSON.parse(stored));
      } catch (err) {
        console.error("データの取得に失敗", err);
      }
    }

    setIsEditMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    if (isEditMode && editIngredientId !== null) {
      const editTarget = ingredients.find((i) => i.id === editIngredientId);
      if (editTarget) {
        setInputName(editTarget.name);
        setSelectedGroupId(editTarget.ingredientGroupId);
        setSelectedUnitId(editTarget.unitId);
        setInputPrice(editTarget.pricePerUnit?.toString() ?? "");
      }
    } else {
      setInputName("");
      setSelectedGroupId(null);
      setSelectedUnitId(null);
      setInputPrice("");
    }
  }, [isEditMode, editIngredientId, ingredients]);

  return (
    <>
      <h1>材料</h1>
      <IngredientForm
        isEditMode={isEditMode}
        editIngredientId={editIngredientId}
        handleSubmit={handleSubmit}
        inputName={inputName}
        setInputName={setInputName}
        selectedGroupId={selectedGroupId}
        handleSelectGroup={handleSelectGroupId}
        ingredientGroup={ingredientGroup}
        selectedUnitId={selectedUnitId}
        handleSelectUnit={handleSelectUnitId}
        units={units}
        inputPrice={inputPrice}
        handleChangePrice={handleChangePrice}
      />
      <ul>
        {ingredients.map((ingredient) => {
          const groupName = ingredientGroup.find(
            (group) => group.id === ingredient.ingredientGroupId
          )?.name;
          const unitName = units.find(
            (unit) => unit.id === ingredient.unitId
          )?.name;

          return (
            <li key={ingredient.id}>
              <span>{ingredient.name}</span>
              <span>{groupName}</span>
              <span>{unitName}</span>
              <span>
                {ingredient.pricePerUnit &&
                  `1${unitName}あたり${ingredient.pricePerUnit}円`}
              </span>
              <button
                onClick={() => handleEditStart(ingredient.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer font-bold"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(ingredient.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer font-bold"
              >
                削除
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default IngredientsPage;
