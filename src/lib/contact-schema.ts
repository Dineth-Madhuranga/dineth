import { z } from "zod";

const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((value) => !/[\r\n\u0000-\u001f\u007f]/.test(value), "Please use a single line.");
export const inquiryTypes = [
  "Job Opportunity",
  "Freelance Project",
  "Collaboration",
  "General Inquiry",
] as const;
export const contactFieldsSchema = z.object({
  name: singleLine(100).pipe(z.string().min(2, "Please enter your full name.")),
  email: z.string().trim().toLowerCase().max(254).email("Please enter a valid email address."),
  company: singleLine(150).optional().default(""),
  inquiry: z.enum(inquiryTypes).default("General Inquiry"),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(5000, "Please keep your message under 5,000 characters.")
    .refine(
      (value) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value),
      "Please remove special control characters.",
    ),
});
export const contactRequestSchema = contactFieldsSchema.extend({
  website: z.string().max(200).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
  idempotencyKey: z.string().uuid(),
});
export type ContactFields = z.infer<typeof contactFieldsSchema>;
export type ContactRequest = z.infer<typeof contactRequestSchema>;
