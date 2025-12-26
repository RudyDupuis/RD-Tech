import z from "zod";

export const jobExperienceSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Le nom est requis"),
  shortDescription: z.string().min(1, "La description courte est requise"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  thumbnail: base64ImageSchema.nullable()
});

export const editJobExperienceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  shortDescription: z.string().min(1, "La description courte est requise"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  thumbnail: base64ImageSchema.nullable()
});

export type JobExperience = z.infer<typeof jobExperienceSchema>;
export type EditJobExperience = z.infer<typeof editJobExperienceSchema>;
