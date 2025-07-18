import { Ingredient, IngredientGroup, Unit } from "@/types/index";
import { useEffect, useMemo, useState } from "react";
import InputText from "./common/ui/input-text";
import SelectBox from "./common/ui/select-box";

type Props = {
  targetId: number | null;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  setClickedListId: React.Dispatch<React.SetStateAction<number | null>>;
  ingredientGroups: IngredientGroup[];
  units: Unit[];
};

const IngredientsForm = (props: Props) => {
  //Propsを代入
  const {
    ingredients,
    setIngredients,
    setClickedListId,
    targetId,
    ingredientGroups,
    units,
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
      targetId !== null
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
      targetId === null
    )
      return;

    // 新しい材料を作成
    const newIngredient = {
      // id: targetId,
      name: inputName,
      ingredientGroupId: selectedGroupId,
      unitId: selectedUnitId,
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

      const getRes = await fetch("api/ingredients");
      const data = await getRes.json();
      setIngredients(data);

      //フォームの内容をリセット
      setInputName("");
      setSelectedUnitId(null);
      setSelectedGroupId(null);
      setInputPrice(null);
      setClickedListId(null);
    } catch (error) {
      alert("更新に失敗しました");
      console.error(error);
    }
  };

  //編集時にフォームに編集対象の情報を初期値としてセット
  useEffect(() => {
    if (targetId !== null) {
      const editTarget = ingredients.find((i) => i.id === targetId);
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
  }, [targetId, ingredients]);

  return (
    // フォーム
    <>
      <h2 className="text-center text-xl font-bold">{`材料を${
        targetId !== null ? "編集" : "登録"
      }`}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          //編集中かどうかで処理をかえる
          if (targetId !== null) {
            handleSubmitEdit();
          } else {
            handleSubmitSave();
          }
        }}
        className="mb-5"
      >
        {/* [input]材料名 */}
        <InputText
          label="食材名"
          value={inputName}
          isRequired={true}
          onChange={(e) => setInputName(e.target.value)}
        />

        {/* [select]分類 */}
        <label className="flex">
          <span className="font-bold">分類</span>
          <select
            name="group"
            value={selectedGroupId ?? ""}
            onChange={(e) =>
              handleSelectGroupId(
                e.target.value ? Number(e.target.value) : null
              )
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
        <SelectBox
          name="group"
          label="分類"
          value={selectedGroupId ?? ""}
          isRequired={true}
          onChange={(e) =>
            handleSelectGroupId(e.target.value ? Number(e.target.value) : null)
          }
          options={ingredientGroups}
        />

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
        <InputText
          label={`${unitLabel}あたりの相場`}
          value={inputPrice ?? ""}
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
          className="w-1/3"
        />

        {/* 送信ボタン */}
        <div className="">
          {targetId !== null ? (
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
    </>
  );
};

export default IngredientsForm;
