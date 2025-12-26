import type z from "zod";
import HardSkillForm from "~/components/admin/forms/HardSkillForm.vue";
import JobExperienceForm from "~/components/admin/forms/JobExperienceForm.vue";
import ProjectExperienceForm from "~/components/admin/forms/ProjectExperienceForm.vue";
import SoftSkillForm from "~/components/admin/forms/SoftSkillForm.vue";
import TrainingExperienceForm from "~/components/admin/forms/TrainingExperienceForm.vue";
import type {
  Mastery,
  HardSkill,
  SoftSkill,
  ProjectExperience,
  JobExperience,
  TrainingExperience
} from "~~/prisma/generated/client";

export type EntityName =
  | "soft-skill"
  | "hard-skill"
  | "project-experience"
  | "job-experience"
  | "training-experience";

export const masteryLabels = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé"
} as const satisfies Record<Mastery, string>;

type EntityTypeMap = {
  "soft-skill": SoftSkill;
  "hard-skill": HardSkill;
  "project-experience": ProjectExperience & { hardSkills: HardSkill[] };
  "job-experience": JobExperience;
  "training-experience": TrainingExperience;
};

const entitySchemaMap: {
  [K in EntityName]: z.ZodType<EntityTypeMap[K]>;
} = {
  "soft-skill": softSkillSchema,
  "hard-skill": hardSkillSchema,
  "project-experience": projectExperienceSchema,
  "job-experience": jobExperienceSchema,
  "training-experience": trainingExperienceSchema
};

type EditEntityTypeMap = {
  "soft-skill": EditSoftSkill;
  "hard-skill": EditHardSkill;
  "project-experience": EditProjectExperience;
  "job-experience": EditJobExperience;
  "training-experience": EditTrainingExperience;
};

const editEntitySchemaMap: {
  [K in EntityName]: z.ZodType<EditEntityTypeMap[K]>;
} = {
  "soft-skill": editSoftSkillSchema,
  "hard-skill": editHardSkillSchema,
  "project-experience": editProjectExperienceSchema,
  "job-experience": editJobExperienceSchema,
  "training-experience": editTrainingExperienceSchema
};

const entityMapperMap: {
  [K in EntityName]: (entity: EntityTypeMap[K]) => EditEntityTypeMap[K];
} = {
  "soft-skill": softSkillToEditSoftSkill,
  "hard-skill": hardSkillToEditHardSkill,
  "project-experience": projectExperienceToEditProjectExperience,
  "job-experience": jobExperienceToEditJobExperience,
  "training-experience": trainingExperienceToEditTrainingExperience
};

const defaultEditableEntity: {
  [K in EntityName]: EditEntityTypeMap[K];
} = {
  "soft-skill": { name: "", svg: "" },
  "hard-skill": { name: "", svg: "", mastery: "beginner" },
  "project-experience": {
    name: "",
    slug: "",
    shortDescription: "",
    longDescription: "",
    isFavorite: false,
    startDate: new Date(),
    endDate: null,
    thumbnail: null,
    images: [],
    projectLink: null,
    codeLink: null,
    hardSkills: []
  },
  "job-experience": {
    name: "",
    shortDescription: "",
    startDate: new Date(),
    endDate: null,
    thumbnail: null
  },
  "training-experience": {
    name: "",
    shortDescription: "",
    startDate: new Date(),
    endDate: null,
    thumbnail: null
  }
};

export const adminEditEntityFormComponents = {
  "soft-skill": SoftSkillForm,
  "hard-skill": HardSkillForm,
  "project-experience": ProjectExperienceForm,
  "job-experience": JobExperienceForm,
  "training-experience": TrainingExperienceForm
} as const;

export type GetEntityType<T extends EntityName> = EntityTypeMap[T];
export type GetEditEntityType<T extends EntityName> = EditEntityTypeMap[T];

export const getEntitySchema = <T extends EntityName>(
  entityName: T
): z.ZodType<GetEntityType<T>> => {
  return entitySchemaMap[entityName];
};

export const getEditEntitySchema = <T extends EntityName>(
  entityName: T
): z.ZodType<GetEditEntityType<T>> => {
  return editEntitySchemaMap[entityName];
};

export const getDefaultEditableEntity = <T extends EntityName>(
  entityName: T
): GetEditEntityType<T> => {
  return defaultEditableEntity[entityName];
};

export const mapEntityToEditableEntity = <T extends EntityName>(
  entityName: T,
  entity: GetEntityType<T>
): GetEditEntityType<T> => {
  return entityMapperMap[entityName](entity);
};

export const getAdminEditEntityFormComponent = <T extends EntityName>(
  entityName: T
): (typeof adminEditEntityFormComponents)[T] => {
  return adminEditEntityFormComponents[entityName];
};
