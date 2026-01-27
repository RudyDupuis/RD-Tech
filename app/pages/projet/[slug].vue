<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug ? route.params.slug.toString() : "";

const { data: projectExperience, isLoading: experienceIsLoading } =
  useFetchData<ProjectExperience>(
    `/api/project-experiences/slug/${slug}`,
    projectExperienceSchema
  );

useHead({
  title: `${projectExperience.value ? projectExperience.value.name : "Projet"} - Rudy Dupuis - Concepteur développeur d'applications`,
  meta: [
    {
      name: "description",
      content: projectExperience.value
        ? projectExperience.value.shortDescription
        : "Détails du projet."
    }
  ]
});

const carouselIndex = ref<number>(0);
const carouselImages = computed<string[]>(() => {
  if (isDefined(projectExperience.value)) {
    return isNotNull(projectExperience.value.thumbnail)
      ? [projectExperience.value.thumbnail, ...projectExperience.value.images]
      : projectExperience.value.images;
  }
  return [];
});

function handleCarousel(direction: "right" | "left") {
  if (
    direction === "right" &&
    carouselIndex.value < carouselImages.value.length - 1
  ) {
    carouselIndex.value += 1;
  }
  if (direction === "left" && carouselIndex.value > 0) {
    carouselIndex.value -= 1;
  }
}
</script>

<template>
  <main
    v-if="projectExperience !== undefined"
    class="flex flex-col items-center justify-center"
  >
    <section
      class="flex flex-col md:flex-row items-center justify-evenly w-full space-y-20 md:space-y-0 py-20"
    >
      <div class="flex flex-col">
        <h1 class="large-title mt-20">{{ projectExperience.name }}</h1>
        <p>
          {{
            formatExperienceDate(
              projectExperience.startDate,
              projectExperience.endDate
            )
          }}
        </p>
      </div>
      <div
        v-if="carouselImages.length != 0"
        class="flex items-center justify-center"
      >
        <p
          v-if="carouselImages.length > 1"
          class="hover:opacity-50 text-4xl cursor-pointer select-none mr-3"
          :class="{ 'opacity-20': carouselIndex === 0 }"
          @click="handleCarousel('left')"
        >
          <i class="fa-solid fa-caret-left" />
        </p>
        <img
          :src="carouselImages[carouselIndex]"
          :alt="
            'Image n°' + carouselIndex + ' du projet ' + projectExperience.name
          "
          class="w-9/12 md:w-72 lg:w-96 xl:w-135"
        />
        <p
          v-if="carouselImages.length > 1"
          class="hover:opacity-50 text-4xl cursor-pointer select-none ml-3"
          :class="{
            'opacity-20': carouselIndex === carouselImages.length - 1
          }"
          @click="handleCarousel('right')"
        >
          <i class="fa-solid fa-caret-right" />
        </p>
      </div>
    </section>

    <section
      class="bg-grey_3 flex flex-col xl:flex-row items-center justify-evenly py-20 w-full px-10 space-y-20 xl:space-y-0"
    >
      <pre class="max-w-screen-sm whitespace-pre-wrap font-primary_regular">{{
        projectExperience.longDescription
      }}</pre>
      <div>
        <h3 class="small-title mb-5">Technologie utilisées :</h3>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
          <SkillDisplayer
            v-for="(hardSkill, index) in projectExperience.hardSkills.sort(
              (a, b) => a.name.localeCompare(b.name)
            )"
            :key="index"
            :skill="hardSkill"
            :svg-class="'fill-grey-1'"
          />
        </div>
      </div>
    </section>

    <section
      class="flex flex-col md:flex-row items-center justify-evenly py-20 w-full space-y-10 md:space-y-0"
    >
      <a
        v-if="isNotNull(projectExperience.projectLink)"
        :href="projectExperience.projectLink"
        target="_blank"
        class="button"
      >
        Découvrir le projet
      </a>
      <a
        v-if="isNotNull(projectExperience.codeLink)"
        :href="projectExperience.codeLink"
        target="_blank"
        class="button"
      >
        Voir le code
      </a>
    </section>
  </main>
  <main v-else class="flex flex-col items-center justify-center space-y-20">
    <section v-if="experienceIsLoading">
      <Loader />
    </section>
    <template v-else>
      <div class="flex flex-col items-center justify-center space-y-10">
        <h1 class="large-title mt-20">Projet introuvable</h1>
        <p>Le projet n'a pas été trouvé ...</p>
      </div>
      <RouterLink :to="{ name: 'mon-parcours' }" class="button">
        Revenir à la liste des projets ?
      </RouterLink>
      <ToolsboxFullSvg />
    </template>
  </main>
</template>
