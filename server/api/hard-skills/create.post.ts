export default defineEventHandler(async (event) => {
  return await create(
    prisma.hardSkill,
    editHardSkillSchema,
    await readBody(event)
  );
});
