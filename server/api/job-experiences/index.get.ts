export default defineEventHandler(async () => {
  return await findMany(prisma.jobExperience);
});
