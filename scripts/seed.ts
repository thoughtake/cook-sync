import { initDb } from "@/db/initDb";
import {
  units,
  ingredientGroups,
  ingredients,
  ingredientGroupColors,
  dishes,
  dishIngredients,
  dishRecipes,
} from "@/db/schema";

async function seed() {
  const db = await initDb();

  console.log("Seeding started...");

  // 単位
  const existingUnits = await db.select().from(units);
  if (existingUnits.length === 0) {
    await db.insert(units).values([
      { name: "個", amountPerUnit: 1 },
      { name: "g", amountPerUnit: 100 },
      { name: "ml", amountPerUnit: 100 },
    ]);
    console.log("Units seeded");
  }

  //分類
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
        { name: "調味料・香辛料・だし" },
        { name: "油・脂類" },
        { name: "果物" },
        { name: "きのこ・海藻" },
        { name: "飲料・酒類" },
        { name: "お菓子" },
        { name: "その他" },
      ]);
    console.log("Ingredient groups seeded");
  }

  //材料
  const existingIngredients = await db.select().from(ingredients);
  if (existingIngredients.length === 0) {
    await db.insert(ingredients).values([
      { name: "にんじん", ingredientGroupId: 1, unitId: 1, pricePerUnit: 60 },
      { name: "玉ねぎ", ingredientGroupId: 1, unitId: 1, pricePerUnit: 40 },
      { name: "じゃがいも", ingredientGroupId: 1, unitId: 1, pricePerUnit: 50 },
      { name: "キャベツ", ingredientGroupId: 1, unitId: 1, pricePerUnit: 200 },
      { name: "きゅうり", ingredientGroupId: 1, unitId: 1, pricePerUnit: 45 },
      { name: "トマト", ingredientGroupId: 1, unitId: 1, pricePerUnit: 100 },
      { name: "レタス", ingredientGroupId: 1, unitId: 1, pricePerUnit: 150 },
      {
        name: "ブロッコリー",
        ingredientGroupId: 1,
        unitId: 1,
        pricePerUnit: 180,
      },
      { name: "鶏むね肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 78 },
      { name: "鶏もも肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 98 },
      { name: "豚バラ肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 120 },
      {
        name: "豚こま切れ",
        ingredientGroupId: 2,
        unitId: 2,
        pricePerUnit: 105,
      },
      {
        name: "牛こま切れ",
        ingredientGroupId: 2,
        unitId: 2,
        pricePerUnit: 180,
      },
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
      {
        name: "オリーブオイル",
        ingredientGroupId: 8,
        unitId: 3,
        pricePerUnit: 55,
      },
      { name: "バター", ingredientGroupId: 8, unitId: 2, pricePerUnit: 90 },
      { name: "りんご", ingredientGroupId: 9, unitId: 1, pricePerUnit: 100 },
      { name: "バナナ", ingredientGroupId: 9, unitId: 1, pricePerUnit: 35 },
      { name: "ぶどう", ingredientGroupId: 9, unitId: 2, pricePerUnit: 85 },
      { name: "しいたけ", ingredientGroupId: 10, unitId: 1, pricePerUnit: 50 },
      { name: "しめじ", ingredientGroupId: 10, unitId: 1, pricePerUnit: 60 },
      { name: "わかめ", ingredientGroupId: 10, unitId: 2, pricePerUnit: 45 },
      { name: "水", ingredientGroupId: 11, unitId: 3, pricePerUnit: 10 },
      {
        name: "チョコレート",
        ingredientGroupId: 12,
        unitId: 2,
        pricePerUnit: 95,
      },
      { name: "クッキー", ingredientGroupId: 12, unitId: 1, pricePerUnit: 40 },
      {
        name: "アイスクリーム",
        ingredientGroupId: 12,
        unitId: 1,
        pricePerUnit: 120,
      },
      {
        name: "カレールー",
        ingredientGroupId: 13,
        unitId: 1,
        pricePerUnit: 130,
      },
      { name: "もやし", ingredientGroupId: 1, unitId: 2, pricePerUnit: 15 },
      { name: "小松菜", ingredientGroupId: 1, unitId: 2, pricePerUnit: 25 },
      { name: "ほうれん草", ingredientGroupId: 1, unitId: 2, pricePerUnit: 30 },
      { name: "大根", ingredientGroupId: 1, unitId: 2, pricePerUnit: 20 },
      { name: "なす", ingredientGroupId: 1, unitId: 1, pricePerUnit: 70 },
      { name: "ピーマン", ingredientGroupId: 1, unitId: 1, pricePerUnit: 40 },
      { name: "ごぼう", ingredientGroupId: 1, unitId: 2, pricePerUnit: 25 },
      { name: "さつまいも", ingredientGroupId: 1, unitId: 2, pricePerUnit: 50 },
      { name: "れんこん", ingredientGroupId: 1, unitId: 2, pricePerUnit: 60 },
      { name: "ズッキーニ", ingredientGroupId: 1, unitId: 1, pricePerUnit: 90 },
      { name: "オクラ", ingredientGroupId: 1, unitId: 1, pricePerUnit: 45 },
      {
        name: "カリフラワー",
        ingredientGroupId: 1,
        unitId: 1,
        pricePerUnit: 220,
      },
      { name: "ミニトマト", ingredientGroupId: 1, unitId: 2, pricePerUnit: 78 },
      { name: "鶏ひき肉", ingredientGroupId: 2, unitId: 2, pricePerUnit: 95 },
      { name: "鶏手羽先", ingredientGroupId: 2, unitId: 2, pricePerUnit: 110 },
      {
        name: "牛肩ロース",
        ingredientGroupId: 2,
        unitId: 2,
        pricePerUnit: 200,
      },
      { name: "豚ロース", ingredientGroupId: 2, unitId: 2, pricePerUnit: 140 },
      { name: "ベーコン", ingredientGroupId: 2, unitId: 2, pricePerUnit: 130 },
      { name: "ハム", ingredientGroupId: 2, unitId: 1, pricePerUnit: 60 },
      { name: "ウインナー", ingredientGroupId: 2, unitId: 1, pricePerUnit: 80 },
      { name: "さけ", ingredientGroupId: 3, unitId: 1, pricePerUnit: 180 },
      { name: "さば", ingredientGroupId: 3, unitId: 1, pricePerUnit: 160 },
      { name: "たら", ingredientGroupId: 3, unitId: 1, pricePerUnit: 150 },
      { name: "えび", ingredientGroupId: 3, unitId: 2, pricePerUnit: 220 },
      { name: "いか", ingredientGroupId: 3, unitId: 2, pricePerUnit: 200 },
      { name: "あさり", ingredientGroupId: 3, unitId: 2, pricePerUnit: 180 },
      { name: "チーズ", ingredientGroupId: 4, unitId: 2, pricePerUnit: 100 },
      { name: "練乳", ingredientGroupId: 4, unitId: 3, pricePerUnit: 85 },
      { name: "おから", ingredientGroupId: 5, unitId: 2, pricePerUnit: 30 },
      { name: "お麩", ingredientGroupId: 5, unitId: 1, pricePerUnit: 25 },
      {
        name: "ミックスビーンズ",
        ingredientGroupId: 5,
        unitId: 2,
        pricePerUnit: 90,
      },
      { name: "玄米", ingredientGroupId: 6, unitId: 2, pricePerUnit: 65 },
      { name: "雑穀米", ingredientGroupId: 6, unitId: 2, pricePerUnit: 75 },
      { name: "そうめん", ingredientGroupId: 6, unitId: 2, pricePerUnit: 50 },
      { name: "ケチャップ", ingredientGroupId: 7, unitId: 3, pricePerUnit: 25 },
      { name: "マヨネーズ", ingredientGroupId: 7, unitId: 3, pricePerUnit: 30 },
      { name: "ソース", ingredientGroupId: 7, unitId: 3, pricePerUnit: 28 },
      { name: "にんにく", ingredientGroupId: 7, unitId: 1, pricePerUnit: 20 },
      { name: "しょうが", ingredientGroupId: 7, unitId: 1, pricePerUnit: 18 },
      { name: "ごま油", ingredientGroupId: 8, unitId: 3, pricePerUnit: 50 },
      {
        name: "ココナッツオイル",
        ingredientGroupId: 8,
        unitId: 3,
        pricePerUnit: 65,
      },
      {
        name: "ブルーベリー",
        ingredientGroupId: 9,
        unitId: 2,
        pricePerUnit: 120,
      },
      { name: "キウイ", ingredientGroupId: 9, unitId: 1, pricePerUnit: 80 },
      {
        name: "グレープフルーツ",
        ingredientGroupId: 9,
        unitId: 1,
        pricePerUnit: 90,
      },
      { name: "エリンギ", ingredientGroupId: 10, unitId: 1, pricePerUnit: 55 },
      { name: "まいたけ", ingredientGroupId: 10, unitId: 1, pricePerUnit: 50 },
      { name: "ひじき", ingredientGroupId: 10, unitId: 2, pricePerUnit: 45 },
      {
        name: "類粒和風だし",
        ingredientGroupId: 7,
        unitId: 2,
        pricePerUnit: 16,
      },
      { name: "三温糖", ingredientGroupId: 7, unitId: 2, pricePerUnit: 30 },
    ]);
    console.log("Ingredients seeded");
  }

  const existingColors = await db.select().from(ingredientGroupColors);
  if (existingColors.length === 0) {
    await db.insert(ingredientGroupColors).values([
      { ingredientGroupId: 1, colorCode: "#4CAF50" },
      { ingredientGroupId: 2, colorCode: "#E57373" },
      { ingredientGroupId: 3, colorCode: "#4FC3F7" },
      { ingredientGroupId: 4, colorCode: "#FFF176" },
      { ingredientGroupId: 5, colorCode: "#A1887F" },
      { ingredientGroupId: 6, colorCode: "#FBC02D" },
      { ingredientGroupId: 7, colorCode: "#FF8A65" },
      { ingredientGroupId: 8, colorCode: "#FFD54F" },
      { ingredientGroupId: 9, colorCode: "#FF7043" },
      { ingredientGroupId: 10, colorCode: "#8D6E63" },
      { ingredientGroupId: 11, colorCode: "#64B5F6" },
      { ingredientGroupId: 12, colorCode: "#BA68C8" },
      { ingredientGroupId: 13, colorCode: "#BDBDBD" },
    ]);
    console.log("Ingredient group colors seeded");
  }

  const existingDishes = await db.select().from(dishes);
  if (existingDishes.length === 0) {
    await db.insert(dishes).values([
      {
        name: "肉じゃが",
        timeMinutes: 40,
        servings: 2,
        isFavorite: false,
        imageUrl:
          "https://www.free-materials.com/adm/wp-content/uploads/2019/05/adpDSC_4094-.jpg",
      },
    ]);
  }

  const existingDishIngredients = await db.select().from(dishIngredients);
  if (existingDishIngredients.length === 0) {
    await db.insert(dishIngredients).values([
      {
        dishId: 1,
        ingredientId: 12, // 豚こま切れ
        quantity: "200",
      },
      {
        dishId: 1,
        ingredientId: 3, // じゃがいも
        quantity: "3",
      },
      {
        dishId: 1,
        ingredientId: 1, // にんじん
        quantity: "1",
      },
      {
        dishId: 1,
        ingredientId: 2, // 玉ねぎ
        quantity: "1",
      },
      {
        dishId: 1,
        ingredientId: 40, // 水
        quantity: "200",
      },
      {
        dishId: 1,
        ingredientId: 25, // しょうゆ
        quantity: "30",
      },
      {
        dishId: 1,
        ingredientId: 27, // 料理酒
        quantity: "30",
      },
      {
        dishId: 1,
        ingredientId: 26, // みりん
        quantity: "30",
      },
      {
        dishId: 1,
        ingredientId: 92, // 類粒和風だし
        quantity: "4.5",
      },
      {
        dishId: 1,
        ingredientId: 93, // 三温糖
        quantity: "18",
      },
      {
        dishId: 1,
        ingredientId: 31, // サラダ油
        quantity: "15",
      },
    ]);
  }

  const existingDishRecipes = await db.select().from(dishRecipes);
  if (existingDishRecipes.length === 0) {
    await db.insert(dishRecipes).values([
      {
        dishId: 1,
        stepNumber: 1,
        description:
          "じゃがいもは皮をむいて芽を取り除いておきます。にんじんはヘタを切り落として皮をむいておきます。玉ねぎは根元を切り落としておきます。",
      },
      {
        dishId: 1,
        stepNumber: 2,
        description:
          "じゃがいも、にんじんは乱切りにします。玉ねぎは1cm幅のくし切りにします。",
      },
      {
        dishId: 1,
        stepNumber: 3,
        description: "豚こま切れ肉は一口大に切ります。",
      },
      {
        dishId: 1,
        stepNumber: 4,
        description:
          "ボウルにしょうゆ、料理酒、みりん、類粒和風だしを入れて混ぜ合わせます。",
      },
      {
        dishId: 1,
        stepNumber: 5,
        description:
          "フライパンにサラダ油をひいて中火で熱し、3を入れて炒めます。豚こま切れ肉の色が変わったら2を入れて炒めます。",
      },
      {
        dishId: 1,
        stepNumber: 6,
        description:
          "全体に油がなじんだら水、三温糖、4を入れ、落し蓋をして弱火で25分程煮ます。豚こま切れ肉とじゃがいもに火が通ったら火から下ろします。",
      },
      {
        dishId: 1,
        stepNumber: 7,
        description: "器に盛り付けて完成です。",
      },
    ]);
  }

  console.log("Seeding complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
