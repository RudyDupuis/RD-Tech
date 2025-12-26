export default defineEventHandler(async (event) => {
  return await updateById(
    prisma.trainingExperience,
    editTrainingExperienceSchema,
    Number(getRouterParam(event, "id")),
    await readBody(event)
  );
});
