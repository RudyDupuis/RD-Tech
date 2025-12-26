export default defineEventHandler(async (event) => {
  return await deleteById(
    prisma.jobExperience,
    Number(getRouterParam(event, "id"))
  );
});
