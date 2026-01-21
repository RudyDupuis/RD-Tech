import z from "zod";

export const trainingExperienceSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Le nom est requis"),
  shortDescription: z.string().min(1, "La description courte est requise"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  thumbnail: base64ImageSchema.nullable()
});

export const editTrainingExperienceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  shortDescription: z.string().min(1, "La description courte est requise"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  thumbnail: base64ImageSchema.nullable()
});

export type TrainingExperience = z.infer<typeof trainingExperienceSchema>;
export type EditTrainingExperience = z.infer<
  typeof editTrainingExperienceSchema
>;
