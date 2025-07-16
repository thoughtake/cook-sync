import { initDb } from "@/db/initDb";
import { units, ingredientGroups } from "@/db/schema";

async function seed() {
  const db = await initDb();

  console.log("Seeding started...");

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
