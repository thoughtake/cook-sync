import { db } from "@/db";
import { ColumnBaseConfig, ColumnDataType, eq } from "drizzle-orm";
import {
  MySqlColumn,
  MySqlTable,
  TableConfig,
} from "drizzle-orm/mysql-core";

type DeleteHandlerParams<
  T extends TableConfig,
  C extends ColumnBaseConfig<ColumnDataType, string>
> = {
  table: MySqlTable<T>;
  column: MySqlColumn<C>;
  id: string;
};

export const deleteHandler = async <
  T extends TableConfig,
  C extends ColumnBaseConfig<ColumnDataType, string>
>({
  table,
  column,
  id,
}: DeleteHandlerParams<T, C>): Promise<Response> => {
  const numberId = Number(id);

  if (isNaN(numberId)) {
    return Response.json(
      { error: "idが数値ではありません", numberId },
      { status: 400 }
    );
  }

  await db.delete(table).where(eq(column, numberId));

  return Response.json({ success: true, deletedId: numberId });
};
