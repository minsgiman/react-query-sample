import { z } from "zod";

export const Coffee = z.object({
  description: z.string(),
  id: z.number(),
  image: z.string(),
  title: z.string(),
  ingredients: z.array(z.string()).optional(),
});

export const Coffees = z.array(Coffee);
