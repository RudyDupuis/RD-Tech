import z from "zod";

export const softSkillSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Le nom est requis"),
  svg: z.string().min(1, "Le SVG est requis")
});

export const editSoftSkillSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  svg: z.string().min(1, "Le SVG est requis")
});

export type SoftSkill = z.infer<typeof softSkillSchema>;
export type EditSoftSkill = z.infer<typeof editSoftSkillSchema>;
