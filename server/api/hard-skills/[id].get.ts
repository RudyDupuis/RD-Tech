export default defineEventHandler(async (event) => {
  return await findUniqueById(
    prisma.hardSkill,
    Number(getRouterParam(event, "id"))
  );
});
