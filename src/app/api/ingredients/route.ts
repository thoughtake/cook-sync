const dummyIngredients: Ingredient[] = [
  {
    id: 0,
    name: "にんじん",
    ingredientGroupId: 0, // 野菜
    unitId: 0, // 個
    pricePerUnit: 100,
  },
  {
    id: 1,
    name: "じゃがいも",
    ingredientGroupId: 0,
    unitId: 0,
    pricePerUnit: 80,
  },
  {
    id: 2,
    name: "鶏もも肉",
    ingredientGroupId: 1, // 肉
    unitId: 1, // g
    pricePerUnit: 120,
  },
  {
    id: 3,
    name: "卵",
    ingredientGroupId: 3, // 卵・乳製品
    unitId: 0,
    pricePerUnit: 20,
  },
  {
    id: 4,
    name: "豆腐",
    ingredientGroupId: 4, // 大豆製品・豆類
    unitId: 0,
    pricePerUnit: 40,
  },
  {
    id: 5,
    name: "りんご",
    ingredientGroupId: 8, // 果物
    unitId: 0,
    pricePerUnit: 150,
  },
  {
    id: 6,
    name: "わかめ",
    ingredientGroupId: 9, // きのこ・海藻
    unitId: 1,
    pricePerUnit: 200,
  },
];


export async function GET() {
 return Response.json(dummyIngredients);
}