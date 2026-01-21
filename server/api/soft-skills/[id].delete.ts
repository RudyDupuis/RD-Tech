export default defineEventHandler(async (event) => {
  return await deleteById(
    prisma.softSkill,
    Number(getRouterParam(event, "id"))
  );
});
