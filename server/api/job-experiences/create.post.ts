export default defineEventHandler(async (event) => {
  return await create(
    prisma.jobExperience,
    editJobExperienceSchema,
    await readBody(event)
  );
});
