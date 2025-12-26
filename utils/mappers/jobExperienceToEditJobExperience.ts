export function jobExperienceToEditJobExperience(
  jobExperience: JobExperience
): EditJobExperience {
  const { id, ...rest } = jobExperience;

  return rest;
}
