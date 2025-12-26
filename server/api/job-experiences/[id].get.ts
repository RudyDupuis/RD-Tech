export default defineEventHandler(async (event) => {
  return await findUniqueById(
    prisma.jobExperience,
    Number(getRouterParam(event, "id"))
  );
});
