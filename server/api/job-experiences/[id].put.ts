export default defineEventHandler(async (event) => {
  return await updateById(
    prisma.jobExperience,
    editJobExperienceSchema,
    Number(getRouterParam(event, "id")),
    await readBody(event)
  );
});
