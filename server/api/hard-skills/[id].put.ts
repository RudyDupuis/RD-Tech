export default defineEventHandler(async (event) => {
  return await updateById(
    prisma.hardSkill,
    editHardSkillSchema,
    Number(getRouterParam(event, "id")),
    await readBody(event)
  );
});
