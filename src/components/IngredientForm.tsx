import { IngredientGroup, Unit } from "@/types/indes";

const IngredientForm = (props) => {
  const {
    isEditMode,
    editIngredientId,
    inputName,
    inputPrice,
    setInputName,
    selectedGroupId,
    selectedUnitId,
    handleSelectGroupId,
    handleSelectUnitId,
    handleChangePrice,
    handleSubmit,
    ingredientGroup,
    units,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <h2>{`材料を${isEditMode ? '編集' : '登録'}`}</h2>
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
      <label className="flex">
        <span className="font-bold">分類</span>
        <select value={selectedGroupId ?? ""} onChange={(e) => handleSelectGroupId(Number(e.target.value))}>
          <option value="">選択してください</option>
          {ingredientGroup.map((group: IngredientGroup) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label className="flex">
        <span className="font-bold">単位</span>
        <select value={selectedUnitId ?? ""} onChange={(e) => handleSelectUnitId(Number(e.target.value))}>
          <option value="">選択してください</option>
          {units.map((unit: Unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label className="flex">
        <span className="font-bold">1単位あたりの相場</span>
        <input
          type="text"
          value={inputPrice}
          onChange={(e) => handleChangePrice(e.target.value)}
          className="border ml-3"
        />
      </label>
      <br />
      <div className="">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer font-bold"
        >
          登録
        </button>
      </div>
    </form>
  );
};

export default IngredientForm;
