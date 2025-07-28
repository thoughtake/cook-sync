import { db } from "@/db";
import { dishes } from "@/db/schema";

export const GET = async () => {
  try {
    const result = await db.select().from(dishes);

    return Response.json(result);
  } catch (err) {
    console.error("GET /api/dishes error:", err);
    return Response.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
