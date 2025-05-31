import { z } from "zod";

export const newItemSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа"),
  description: z.string().min(3, "Минимум 3 символа"),
  category: z.string().min(3, "Минимум 3 символа"),
  quantity: z.number().min(1, "Должно быть больше или равно 1"),
  price: z.number().min(0, "Не может быть отрицательной"),
});

export type NewItemFormValues = z.infer<typeof newItemSchema>;
