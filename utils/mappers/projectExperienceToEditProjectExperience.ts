export function projectExperienceToEditProjectExperience(
  projectExperience: ProjectExperience
): EditProjectExperience {
  const { id, hardSkills, ...rest } = projectExperience;

  return {
    ...rest,
    hardSkills: hardSkills.map((hardSkill) => hardSkill.id)
  };
}
