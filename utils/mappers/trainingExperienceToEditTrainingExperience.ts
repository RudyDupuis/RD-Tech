export function trainingExperienceToEditTrainingExperience(
  trainingExperience: TrainingExperience
): EditTrainingExperience {
  const { id, ...rest } = trainingExperience;

  return rest;
}
