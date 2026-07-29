import { z } from "zod";

export const FlightSchema = z.object({
  id: z.string(),
  route: z.string(),
  time: z.string().optional(),
  price: z.string().optional(),
  carrier: z.string().optional(),
});

export const HotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string().optional(),
  img: z.string().optional(),
});

export const ActivitySchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string().optional(),
});

export type Flight = z.infer<typeof FlightSchema>;
export type Hotel = z.infer<typeof HotelSchema>;
export type Activity = z.infer<typeof ActivitySchema>;

export type SearchCategory = "flights" | "hotels" | "activities";
export type DataSource = "rapidapi" | "mock";

export const SearchResponseSchema = z.object({
  source: z.enum(["rapidapi", "mock"]),
  query: z.string(),
  results: z.array(z.unknown()),
  warning: z.string().optional(),
});

export type ApiErrorBody = {
  error: string;
  code?: string;
};
