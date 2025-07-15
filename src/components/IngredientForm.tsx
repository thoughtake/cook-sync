import { IngredientGroup, Unit } from "@/types/indes";
type Props = {
    inputName: string;
    inputPrice: number | null;
    setInputName: React.Dispatch<React.SetStateAction<string>>;
    selectedGroupId: number | null;
    selectedUnitId: number | null;
    selectedUnit: Unit | undefined;
    handleSelectGroupId: (groupId: number | null) => void;
    handleSelectUnitId: (unitId: number | null) => void;
    handleChangePrice: (price: number | null) => void;
    handleSubmit: () => void;
    ingredientGroup: IngredientGroup[];
    units: Unit[];
    isEditMode: boolean;
    editingIngredientId: number | null;
    isDisabled: boolean;
}


const IngredientForm = (props: Props) => {

  const {
    inputName,
    inputPrice,
    setInputName,
    selectedGroupId,
    selectedUnitId,
    selectedUnit,
    handleSelectGroupId,
    handleSelectUnitId,
    handleChangePrice,
    handleSubmit,
    ingredientGroup,
    units,
    isEditMode,
    editingIngredientId,
    isDisabled,
  } = props;

  const unitLabel = selectedUnit
  ? `${selectedUnit.amountPerUnit}${selectedUnit.name}`
  : "1単位"

  return (
    // フォーム
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
      }} className="mb-5">
      <h2>{`材料を${isEditMode ? '編集' : '登録'}`}</h2>

      {/* [input]材料名 */}
      <label className="flex">
        <span className="font-bold">材料名</span>
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
        <select name="group" value={selectedGroupId ?? ""} onChange={e => handleSelectGroupId(e.target.value ? Number(e.target.value) : null)}>
          <option value="">選択してください</option>
          {ingredientGroup.map((group: IngredientGroup) => (
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
        <select name="unit" value={selectedUnitId ?? ""} onChange={e => handleSelectUnitId(e.target.value ? Number(e.target.value) : null)}>
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
      <label className={`flex ${selectedUnitId === null ? "hidden" : "visible"}`}>
        <span className="font-bold">{`${unitLabel}あたりの相場`}</span>
        <input
          type="text"
          value={inputPrice ?? ""}
          onChange={(e) => {
            const value = e.target.value
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
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer font-bold"
        >
          登録
        </button>
      </div>
    </form>
  );
};

export default IngredientForm;
