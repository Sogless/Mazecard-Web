import { z } from "zod";

export const coopStep1Schema = z.object({
  cooperative_name: z.string().min(2, "Cooperative name is required"),
  address: z.string().min(5, "Address is required"),
  state: z.string().optional(),
  lga: z.string().optional(),
  contact_name: z.string().min(2, "Contact name is required"),
  contact_role: z.string().min(2, "Contact role is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

export const coopStep2Schema = z.object({
  registration_type: z.string().optional(),
  registration_id: z.string().optional(),
  estimated_member_count: z.coerce.number().min(1, "Member count is required"),
  pilot_cohort_size: z.coerce.number().min(1, "Pilot size is required"),
  preferred_card_scheme: z.string().min(1, "Card scheme is required"),
  uses_akilaah: z.string(),
  desired_launch_timeline: z.string().min(1, "Timeline is required"),
});

export const coopStep4Schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const merchantSchema = z.object({
  business_name: z.string().min(2, "Business name is required"),
  category: z.string().min(1, "Category is required"),
  address: z.string().min(5, "Address is required"),
  contact_name: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  registration_id: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  type: z.enum(["Sales", "Partnership", "Support"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const demoBookingSchema = z.object({
  preferred_date: z.string().min(1, "Date is required"),
  timezone: z.string().min(1, "Timezone is required"),
  topics: z.array(z.string()).min(1, "Select at least one topic"),
  notes: z.string().optional(),
});

export const signInSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});
