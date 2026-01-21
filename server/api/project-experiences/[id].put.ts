export default defineEventHandler(async (event) => {
  return await updateById(
    prisma.projectExperience,
    editProjectExperienceSchema,
    Number(getRouterParam(event, "id")),
    await readBody(event),
    (data) => ({
      ...data,
      hardSkills: {
        set: data.hardSkills.map((id) => ({ id }))
      }
    })
  );
});
