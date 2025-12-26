export default defineEventHandler(async (event) => {
  return await create(
    prisma.trainingExperience,
    editTrainingExperienceSchema,
    await readBody(event)
  );
});
