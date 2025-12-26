export default defineEventHandler(async (event) => {
  return await create(
    prisma.softSkill,
    editSoftSkillSchema,
    await readBody(event)
  );
});
