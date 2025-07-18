import { Ingredient, IngredientGroup, Unit } from "@/types/index";
import { useEffect, useMemo, useState } from "react";

type Props = {
  // inputName: string;
  // inputPrice: number | null;
  // setInputName: React.Dispatch<React.SetStateAction<string>>;
  // selectedGroupId: number | null;
  // selectedUnitId: number | null;
  // selectedUnit: Unit | undefined;
  // handleSelectGroupId: (groupId: number | null) => void;
  // handleSelectUnitId: (unitId: number | null) => void;
  // handleChangePrice: (price: number | null) => void;
  // handleSubmitSave: () => void;
  // handleSubmitEdit: () => void;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  editingIngredientId: number | null;
  setEditIngredientId: React.Dispatch<React.SetStateAction<number | null>>;
  ingredientGroups: IngredientGroup[];
  units: Unit[];
  // isEditMode: boolean;
  // isDisabled: boolean;
};

const IngredientsForm = (props: Props) => {
  //Propsを代入
  const {
    // inputName,
    // inputPrice,
    // setInputName,
    // selectedGroupId,
    // selectedUnitId,
    // selectedUnit,
    // handleSelectGroupId,
    // handleSelectUnitId,
    // handleChangePrice,
    // handleSubmitSave,
    // handleSubmitEdit,
    ingredients,
    setIngredients,
    editingIngredientId = null,
    setEditIngredientId,
    ingredientGroups,
    units,
    // isEditMode,
    // isDisabled,
  } = props;

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

  //セレクトされている単位情報を取得
  const selectedUnit: Unit | undefined = useMemo(() => {
    return units.find((unit) => unit.id === selectedUnitId);
  }, [units, selectedUnitId]);

  //単位の文言を変更する際に使用
  const unitLabel = selectedUnit
    ? `${selectedUnit.amountPerUnit}${selectedUnit.name}`
    : "1単位";

  //フォームの送信（保存）
  const handleSubmitSave = async () => {
    //編集モードでないこと
    if (
      selectedUnitId === null ||
      selectedGroupId === null ||
      editingIngredientId !== null
    )
      return;

    // 新しい材料を作成
    const newIngredient = {
      // id: nextId.current,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
      pricePerUnit: inputPrice,
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
      editingIngredientId === null
    )
      return;

    // 新しい材料を作成
    const newIngredient = {
      // id: editingIngredientId,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
      pricePerUnit: inputPrice,
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
      setEditIngredientId(null);
    } catch (error) {
      alert("更新に失敗しました");
      console.error(error);
    }
  };

  //編集時にフォームに編集対象の情報を初期値としてセット
  useEffect(() => {
    if (editingIngredientId !== null) {
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
  }, [editingIngredientId, ingredients]);

  return (
    // フォーム
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //編集中かどうかで処理をかえる
        if (editingIngredientId !== null) {
          handleSubmitEdit();
        } else {
          handleSubmitSave();
        }
      }}
      className="mb-5"
    >
      <h2>{`材料を${editingIngredientId !== null ? "編集" : "登録"}`}</h2>

      {/* [input]材料名 */}
      <label className="flex">
        <span className="font-bold">食材名</span>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="border ml-3"
        />
      </label>
      <br />

      {/* [select]分類 */}
      <label className="flex">
        <span className="font-bold">分類</span>
        <select
          name="group"
          value={selectedGroupId ?? ""}
          onChange={(e) =>
            handleSelectGroupId(e.target.value ? Number(e.target.value) : null)
          }
          className="border"
        >
          <option value="">選択してください</option>
          {ingredientGroups.map((group: IngredientGroup) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      {/* [select]単位 */}
      <label className="flex">
        <span className="font-bold">単位</span>
        <select
          name="unit"
          value={selectedUnitId ?? ""}
          onChange={(e) =>
            handleSelectUnitId(e.target.value ? Number(e.target.value) : null)
          }
          className="border"
        >
          <option value="">選択してください</option>
          {units.map((unit: Unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      {/* //[input]相場 */}
      <label
        className={`flex ${selectedUnitId === null ? "hidden" : "visible"}`}
      >
        <span className="font-bold">{`${unitLabel}あたりの相場`}</span>
        <input
          type="text"
          value={inputPrice ?? ""}
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
          className="border ml-3"
        />
      </label>
      <br />

      {/* 送信ボタン */}
      <div className="">
        {editingIngredientId !== null ? (
          <button
            type="submit"
            disabled={isDisabled}
            className="bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer font-bold disabled:bg-gray-500 disabled:opacity-50"
          >
            編集
          </button>
        ) : (
          <button
            type="submit"
            disabled={isDisabled}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer font-bold disabled:bg-gray-500 disabled:opacity-50"
          >
            登録
          </button>
        )}
      </div>
    </form>
  );
};

export default IngredientsForm;
