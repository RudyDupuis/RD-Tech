export default defineEventHandler(async (event) => {
  return await findUniqueById(
    prisma.projectExperience,
    Number(getRouterParam(event, "id")),
    { include: { hardSkills: true } }
  );
});
