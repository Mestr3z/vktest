import { rest } from "msw";
import type { Item } from "../types/types";

const itemsPage1: Item[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Desc ${i + 1}`,
  quantity: i + 1,
  price: i * 10,
  category: "Test",
}));

export const handlers = [
  rest.get<Item[]>("http://localhost:4000/items", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("_page") ?? "1");
    if (page === 1) {
      return res(ctx.status(200), ctx.json(itemsPage1));
    }
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.post<Item>("http://localhost:4000/items", async (req, res, ctx) => {
    const newItem = await req.json();
    return res(ctx.status(201), ctx.json({ id: 999, ...newItem }));
  }),
];
