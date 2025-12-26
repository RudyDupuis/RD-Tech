export default defineEventHandler(async () => {
  return await findMany(prisma.projectExperience, {
    include: { hardSkills: true },
    where: { isFavorite: true }
  });
});
