export default defineEventHandler(async (event) => {
  return await deleteById(
    prisma.trainingExperience,
    Number(getRouterParam(event, "id"))
  );
});
