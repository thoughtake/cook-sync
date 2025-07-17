import { initDb } from "@/db/initDb";
import { units, ingredientGroups, ingredients } from "@/db/schema";

async function seed() {
  const db = await initDb();

  console.log("Seeding started...");

const existingIngredients = await db.select().from(ingredients);
if (existingIngredients.length === 0) {
  await db.insert(ingredients).values([
    { name: "にんじん", ingredientGroupId: 1, unitId: 2, pricePerUnit: 35 },
    { name: "玉ねぎ", ingredientGroupId: 1, unitId: 2, pricePerUnit: 28 },
    { name: "じゃがいも", ingredientGroupId: 1, unitId: 2, pricePerUnit: 40 },
    { name: "キャベツ", ingredientGroupId: 1, unitId: 2, pricePerUnit: 25 },
    { name: "きゅうり", ingredientGroupId: 1, unitId: 1, pricePerUnit: 45 },
    { name: "トマト", ingredientGroupId: 1, unitId: 1, pricePerUnit: 60 },
    { name: "レタス", ingredientGroupId: 1, unitId: 2, pricePerUnit: 30 },
    { name: "ブロッコリー", ingredientGroupId: 1, unitId: 1, pricePerUnit: 120 },
    { name: "鶏むね肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 78 },
    { name: "鶏もも肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 98 },
    { name: "豚バラ肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 120 },
    { name: "豚こま切れ", ingredientGroupId: 2, unitId: 2, pricePerUnit: 105 },
    { name: "牛こま切れ", ingredientGroupId: 2, unitId: 2, pricePerUnit: 180 },
    { name: "牛ひき肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 160 },
    { name: "卵", ingredientGroupId: 4, unitId: 1, pricePerUnit: 25 },
    { name: "牛乳", ingredientGroupId: 4, unitId: 3, pricePerUnit: 80 },
    { name: "ヨーグルト", ingredientGroupId: 4, unitId: 3, pricePerUnit: 70 },
    { name: "豆腐", ingredientGroupId: 5, unitId: 1, pricePerUnit: 45 },
    { name: "納豆", ingredientGroupId: 5, unitId: 1, pricePerUnit: 35 },
    { name: "油揚げ", ingredientGroupId: 5, unitId: 1, pricePerUnit: 40 },
    { name: "白米", ingredientGroupId: 6, unitId: 2, pricePerUnit: 55 },
    { name: "食パン", ingredientGroupId: 6, unitId: 1, pricePerUnit: 35 },
    { name: "うどん", ingredientGroupId: 6, unitId: 2, pricePerUnit: 48 },
    { name: "パスタ", ingredientGroupId: 6, unitId: 2, pricePerUnit: 58 },
    { name: "しょうゆ", ingredientGroupId: 7, unitId: 3, pricePerUnit: 25 },
    { name: "みりん", ingredientGroupId: 7, unitId: 3, pricePerUnit: 30 },
    { name: "料理酒", ingredientGroupId: 7, unitId: 3, pricePerUnit: 28 },
    { name: "砂糖", ingredientGroupId: 7, unitId: 2, pricePerUnit: 20 },
    { name: "塩", ingredientGroupId: 7, unitId: 2, pricePerUnit: 10 },
    { name: "こしょう", ingredientGroupId: 7, unitId: 2, pricePerUnit: 60 },
    { name: "サラダ油", ingredientGroupId: 8, unitId: 3, pricePerUnit: 35 },
    { name: "オリーブオイル", ingredientGroupId: 8, unitId: 3, pricePerUnit: 55 },
    { name: "バター", ingredientGroupId: 8, unitId: 2, pricePerUnit: 90 },
    { name: "りんご", ingredientGroupId: 9, unitId: 1, pricePerUnit: 100 },
    { name: "バナナ", ingredientGroupId: 9, unitId: 1, pricePerUnit: 35 },
    { name: "ぶどう", ingredientGroupId: 9, unitId: 2, pricePerUnit: 85 },
    { name: "しいたけ", ingredientGroupId: 10, unitId: 1, pricePerUnit: 50 },
    { name: "しめじ", ingredientGroupId: 10, unitId: 1, pricePerUnit: 60 },
    { name: "わかめ", ingredientGroupId: 10, unitId: 2, pricePerUnit: 45 },
    { name: "水", ingredientGroupId: 11, unitId: 3, pricePerUnit: 10 },
    { name: "お茶", ingredientGroupId: 11, unitId: 3, pricePerUnit: 15 },
    { name: "ビール", ingredientGroupId: 11, unitId: 3, pricePerUnit: 90 },
    { name: "チョコレート", ingredientGroupId: 12, unitId: 2, pricePerUnit: 95 },
    { name: "クッキー", ingredientGroupId: 12, unitId: 1, pricePerUnit: 40 },
    { name: "アイスクリーム", ingredientGroupId: 12, unitId: 1, pricePerUnit: 120 },
    { name: "インスタントラーメン", ingredientGroupId: 13, unitId: 1, pricePerUnit: 110 },
    { name: "冷凍炒飯", ingredientGroupId: 13, unitId: 2, pricePerUnit: 80 },
    { name: "レトルトカレー", ingredientGroupId: 13, unitId: 1, pricePerUnit: 130 },
    { name: "もやし", ingredientGroupId: 1, unitId: 2, pricePerUnit: 15 },
  ]);
  console.log("Ingredients seeded");
}

  const existingUnits = await db.select().from(units);
  if (existingUnits.length === 0) {
    await db.insert(units).values([
      { name: "個", amountPerUnit: 1 },
      { name: "g", amountPerUnit: 100 },
      { name: "ml", amountPerUnit: 100 },
    ]);
    console.log("Units seeded");
  }

  const existingGroups = await db.select().from(ingredientGroups);
  if (existingGroups.length === 0) {
    await db
      .insert(ingredientGroups)
      .values([
        { name: "野菜" },
        { name: "肉" },
        { name: "魚介類" },
        { name: "卵・乳製品" },
        { name: "大豆製品・豆類" },
        { name: "穀類・パン・麺類" },
        { name: "調味料・香辛料" },
        { name: "油・脂類" },
        { name: "果物" },
        { name: "きのこ・海藻" },
        { name: "飲料・酒類" },
        { name: "お菓子" },
        { name: "その他" },
      ]);
    console.log("Ingredient groups seeded");
  }

  console.log("Seeding complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
