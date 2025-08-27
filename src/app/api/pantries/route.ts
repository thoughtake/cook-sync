import { db } from "@/db"
import { pantries } from "@/db/schema";

export const GET = async () => {
  try {
    const result = await db.select().from(pantries);

    return Response.json(result);
  } catch (err) {
    console.error("GET /api/pantries error:", err)
    return Response.json(
      { error: "データの取得に失敗しました"},
      {status: 500}
    )
  }
} 