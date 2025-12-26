export default defineEventHandler(async (event) => {
  return await updateById(
    prisma.softSkill,
    editSoftSkillSchema,
    Number(getRouterParam(event, "id")),
    await readBody(event)
  );
});
