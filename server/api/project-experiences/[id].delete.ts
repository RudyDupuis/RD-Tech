export default defineEventHandler(async (event) => {
  return await deleteById(
    prisma.projectExperience,
    Number(getRouterParam(event, "id"))
  );
});
