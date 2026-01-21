import z from "zod";

export const projectExperienceSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Le nom est requis"),
  slug: z.string().min(1, "Le slug est requis"),
  shortDescription: z.string().min(1, "La description courte est requise"),
  longDescription: z.string().min(1, "La description longue est requise"),
  isFavorite: z.boolean().default(false),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  thumbnail: base64ImageSchema.nullable(),
  images: z.array(base64ImageSchema),
  projectLink: z.url("L'URL du projet doit être valide").nullable(),
  codeLink: z.url("L'URL du code doit être valide").nullable(),
  hardSkills: z.array(hardSkillSchema)
});

export const editProjectExperienceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  slug: z.string().min(1, "Le slug est requis"),
  shortDescription: z.string().min(1, "La description courte est requise"),
  longDescription: z.string().min(1, "La description longue est requise"),
  isFavorite: z.boolean().default(false),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  thumbnail: base64ImageSchema.nullable(),
  images: z.array(base64ImageSchema),
  projectLink: z.preprocess(
    (val) => (val === "" ? null : val),
    z.url("L'URL du projet doit être valide").nullable()
  ),
  codeLink: z.preprocess(
    (val) => (val === "" ? null : val),
    z.url("L'URL du code doit être valide").nullable()
  ),
  hardSkills: z.array(z.number()).min(1, "Au moins un hardskill est requis")
});

export type ProjectExperience = z.infer<typeof projectExperienceSchema>;
export type EditProjectExperience = z.infer<typeof editProjectExperienceSchema>;
