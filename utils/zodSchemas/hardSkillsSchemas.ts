import z from "zod";
import { Mastery } from "~~/prisma/generated/enums";

export const hardSkillSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Le nom est requis"),
  svg: z.string().min(1, "Le SVG est requis"),
  mastery: z.enum(Mastery)
});

export const editHardSkillSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  svg: z.string().min(1, "Le SVG est requis"),
  mastery: z.enum(Mastery)
});

export type HardSkill = z.infer<typeof hardSkillSchema>;
export type EditHardSkill = z.infer<typeof editHardSkillSchema>;
