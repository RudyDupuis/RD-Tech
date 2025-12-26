export default defineEventHandler(async (event) => {
  return await create(
    prisma.projectExperience,
    editProjectExperienceSchema,
    await readBody(event),
    (data) => ({
      ...data,
      hardSkills: {
        connect: data.hardSkills.map((id) => ({ id }))
      }
    })
  );
});
