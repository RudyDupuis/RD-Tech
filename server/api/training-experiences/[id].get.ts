export default defineEventHandler(async (event) => {
  return await findUniqueById(
    prisma.trainingExperience,
    Number(getRouterParam(event, "id"))
  );
});
