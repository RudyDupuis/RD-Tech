<script setup lang="ts">
import z from "zod";

useHead({
  title: "Mon parcours - Rudy Dupuis - Concepteur développeur d'applications",
  meta: [
    {
      name: "description",
      content:
        "Découvrez mon parcours (Rudy Dupuis), Concepteur développeur d'applications passionné. Explorez mes formations, mes expériences professionnelles et les projets que j'ai réalisés."
    }
  ]
});

const { data: hardSkills, isLoading: hardSkillsIsLoading } = useFetchData<
  Array<HardSkill>
>("/api/hard-skills", z.array(hardSkillSchema));

const { data: projectExperiences, isLoading: projectExperiencesIsLoading } =
  useFetchData<Array<ProjectExperience>>(
    "/api/project-experiences",
    z.array(projectExperienceSchema)
  );
const { data: jobExperiences, isLoading: jobExperiencesIsLoading } =
  useFetchData<Array<JobExperience>>(
    "/api/job-experiences",
    z.array(jobExperienceSchema)
  );
const { data: trainingExperiences, isLoading: trainingExperiencesIsLoading } =
  useFetchData<Array<TrainingExperience>>(
    "/api/training-experiences",
    z.array(trainingExperienceSchema)
  );

const experiencesFilter = ref<undefined | "project" | "job" | "training">(
  undefined
);
const projectsFilter = ref<Array<HardSkill["id"]>>([]);

const filteredExperiences = computed<Array<Experience>>(() => {
  const experiences: Experience[] = [];
  const projectExperienceArray = projectExperiences.value ?? [];
  const jobExperienceArray = jobExperiences.value ?? [];
  const trainingExperienceArray = trainingExperiences.value ?? [];

  if (projectsFilter.value.length === 0) {
    switch (experiencesFilter.value) {
      case "project":
        experiences.push(...projectExperienceArray);
        break;
      case "job":
        experiences.push(...jobExperienceArray);
        break;
      case "training":
        experiences.push(...trainingExperienceArray);
        break;
      default:
        experiences.push(
          ...projectExperienceArray,
          ...jobExperienceArray,
          ...trainingExperienceArray
        );
    }
  } else {
    experiences.push(
      ...projectExperienceArray.filter((project: ProjectExperience) =>
        projectsFilter.value.every((hardSkillfilterId) =>
          project.hardSkills.some(
            (hardSkill) => hardSkill.id === hardSkillfilterId
          )
        )
      )
    );
  }

  return experiences.sort(
    (a, b) => b.startDate.getTime() - a.startDate.getTime()
  );
});

function toggleExperiencesFilter(filter: "project" | "job" | "training") {
  projectsFilter.value = [];
  experiencesFilter.value =
    experiencesFilter.value === filter ? undefined : filter;
}

function toggleProjectFilterByHardSkill(filter: HardSkill["id"]) {
  experiencesFilter.value = "project";
  if (projectsFilter.value.includes(filter)) {
    projectsFilter.value = projectsFilter.value.filter((id) => id !== filter);
  } else {
    projectsFilter.value.push(filter);
  }
}
const hasExperiencesData = computed<boolean>(() => {
  return (
    isDefined(projectExperiences.value) &&
    projectExperiences.value.length !== 0 &&
    isDefined(jobExperiences.value) &&
    jobExperiences.value.length !== 0 &&
    isDefined(trainingExperiences.value) &&
    trainingExperiences.value.length !== 0
  );
});
</script>

<template>
  <main>
    <h1 class="large-title mt-40 mb-16">Mon parcours</h1>

    <a href="#parcours" class="flex flex-col items-center mb-5">
      <p class="font-primary-regular text-sm text-center">
        Faites défiler pour voir mon parcours
      </p>
      <p class="information-arrow text-4xl">↓</p>
    </a>

    <section class="flex flex-col items-center bg-grey-3 py-10 space-y-10">
      <h2 class="medium-title">Trier</h2>
      <div
        class="flex flex-col items-center justify-center space-y-3 lg:flex-row lg:space-y-0 lg:space-x-20 w-full"
      >
        <button
          class="choice-button"
          :class="{
            'choice-button--active': experiencesFilter === 'project'
          }"
          @click="toggleExperiencesFilter('project')"
        >
          Projets uniquement
        </button>
        <button
          class="choice-button ml1"
          :class="{
            'choice-button--active': experiencesFilter === 'job'
          }"
          @click="toggleExperiencesFilter('job')"
        >
          Emplois uniquement
        </button>
        <button
          class="choice-button ml1"
          :class="{
            'choice-button--active': experiencesFilter === 'training'
          }"
          @click="toggleExperiencesFilter('training')"
        >
          Formations uniquement
        </button>
      </div>
      <h2 class="medium-title">Projet utilisant</h2>
      <div
        class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12 gap-4"
      >
        <SkillDisplayer
          v-for="(hardSkill, index) in hardSkills?.sort((a, b) =>
            a.name.localeCompare(b.name)
          )"
          :key="index"
          :skill="hardSkill"
          :size="40"
          class="cursor-pointer hover:opacity-50"
          :svg-class="
            projectsFilter.includes(hardSkill.id)
              ? 'fill-primary'
              : 'fill-grey-1'
          "
          @click="toggleProjectFilterByHardSkill(hardSkill.id)"
        />
      </div>
      <FetchDataDisplayer
        :is-loading="hardSkillsIsLoading"
        :has-data="isDefined(hardSkills) && hardSkills.length !== 0"
      />
    </section>

    <section id="parcours" class="flex flex-col items-center py-20">
      <div
        v-for="(experience, index) in filteredExperiences"
        :key="index"
        class="flex flex-col items-center space-y-10"
      >
        <template
          v-if="
            index === 0 ||
            experience.startDate.getFullYear() !==
              filteredExperiences[index - 1]?.startDate.getFullYear()
          "
        >
          <div
            v-if="index !== 0"
            class="bg-primary w-2 h-10 rounded-xl mt-10"
          />
          <h3 class="small-title">
            {{ experience.startDate.getFullYear() }}
          </h3>
        </template>
        <div class="bg-primary w-2 h-10 rounded-xl mt-10" />
        <ExperienceDisplayer :experience="experience" />
      </div>
      <p v-if="filteredExperiences.length === 0 && hasExperiencesData">
        Aucun résultat ...
      </p>
      <FetchDataDisplayer
        :is-loading="
          projectExperiencesIsLoading ||
          jobExperiencesIsLoading ||
          trainingExperiencesIsLoading
        "
        :has-data="hasExperiencesData"
      />
    </section>
  </main>
</template>

<style scoped>
.information-arrow {
  animation: moving 3s ease-in-out infinite;
}

@keyframes moving {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(2px);
  }
  60% {
    transform: translateY(10px);
  }
  70% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
