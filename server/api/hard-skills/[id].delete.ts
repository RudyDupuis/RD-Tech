export default defineEventHandler(async (event) => {
  return await deleteById(
    prisma.hardSkill,
    Number(getRouterParam(event, "id"))
  );
});
