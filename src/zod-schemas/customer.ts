import { customers } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First name is required"),
  lastName: (schema) => schema.min(1, "First name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.length(2, "State must be 2 characters"),
  email: (schema) => schema.email("Invalid email address"),
  zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
  phone: (schema) => schema.regex(/^\d{10}$/, "Invalid phone number"),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
