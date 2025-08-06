import z from "zod";

export const IdSchema = z.string().regex(/^\d+$/);