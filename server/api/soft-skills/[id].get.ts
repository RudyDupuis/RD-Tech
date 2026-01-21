export default defineEventHandler(async (event) => {
  return await findUniqueById(
    prisma.softSkill,
    Number(getRouterParam(event, "id"))
  );
});
