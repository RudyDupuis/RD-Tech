export default defineEventHandler(async (event) => {
  try {
    return await prisma.projectExperience.findUnique({
      where: { slug: getRouterParam(event, "slug") },
      include: { hardSkills: true }
    });
  } catch (error) {
    throw apiHandleError(error);
  }
});
