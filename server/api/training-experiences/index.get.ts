export default defineEventHandler(async () => {
  return await findMany(prisma.trainingExperience);
});
