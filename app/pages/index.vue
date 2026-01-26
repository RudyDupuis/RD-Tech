<script setup lang="ts">
import z from "zod";
import type { Mastery } from "~~/prisma/generated/enums";

useHead({
  title: "Accueil - Rudy Dupuis - Concepteur développeur d'applications",
  meta: [
    {
      name: "description",
      content:
        "Je suis Rudy Dupuis, un Concepteur développeur d'applications passionné par l'UX. J'ai fusionné ma passion pour le bricolage et le numérique dans la conception de ce site. Découvrez mon parcours et mes compétences. Contactez-moi pour discuter de votre projet numérique."
    }
  ]
});

const isSmallScreen = useIsSmallScreen();

const { data: hardSkills, isLoading: hardskillIsLoading } = useFetchData<
  Array<HardSkill>
>("/api/hard-skills", z.array(hardSkillSchema));
const { data: softSkills, isLoading: softskillIsLoading } = useFetchData<
  Array<SoftSkill>
>("/api/soft-skills", z.array(softSkillSchema));
const { data: favoriteProjects, isLoading: experienceIsLoading } = useFetchData<
  Array<ProjectExperience>
>("/api/project-experiences/favorites", z.array(projectExperienceSchema));

const hardSkillsFilter = ref<Mastery | undefined>(undefined);
function toggleFilter(filter: Mastery) {
  hardSkillsFilter.value =
    hardSkillsFilter.value === filter ? undefined : filter;
}

const filteredHardSkills = computed<Array<HardSkill>>(() => {
  if (isUndefined(hardSkills.value)) {
    return [];
  }
  if (isUndefined(hardSkillsFilter.value)) {
    return hardSkills.value;
  }
  return hardSkills.value.filter(
    (hardSkill) => hardSkill.mastery === hardSkillsFilter.value
  );
});
</script>

<template>
  <main>
    <section
      id="hero-banner"
      class="flex min-h-minus-header items-center justify-evenly"
    >
      <template v-if="isDefined(isSmallScreen)">
        <div class="flex flex-col items-center justify-around space-y-10">
          <h1 class="large-title">Rudy Dupuis</h1>
          <p>Concepteur développeur d'applications</p>
          <ToolsboxAnimComp v-if="isSmallScreen" />
          <a href="#presentation" class="button">Découvrir mon profil</a>
        </div>
        <ToolsboxAnimComp v-if="!isSmallScreen" />
      </template>
      <Loader v-else />
    </section>

    <section
      v-if="isDefined(isSmallScreen)"
      id="presentation"
      class="flex items-center justify-evenly pb-20 md:px-20 md:space-x-10"
    >
      <img
        v-if="!isSmallScreen"
        src="/images/rudy-picture.svg"
        alt="Une photo de rudy dupuis"
        class="select-none"
      />
      <div class="flex flex-col items-center space-y-20">
        <h2 class="medium-title">Qui suis je ?</h2>
        <img
          v-if="isSmallScreen"
          src="/images/rudy-picture.svg"
          alt="Une photo de rudy dupuis"
          style="width: 250px; height: 250px"
          class="select-none"
        />
        <p class="px-10 md:px-0 max-w-screen-md">
          Passionné par le bricolage et le numérique, j&apos;ai fusionné ces
          deux univers dans la conception de ce site. Tout comme le bricolage
          nécessite l&apos;utilisation d&apos;outils, je donne vie à des
          concepts numériques à l&apos;aide des langages de programmation et des
          logiciels.
          <br />
          <br />
          Je suis
          <strong>développeur d'applications</strong>
          avec une appétence pour l&apos;
          <strong>UX design</strong>
          , impliqué dans toutes les étapes du processus, de la
          <strong>conception graphique</strong>
          , au
          <strong>développement</strong>
          , jusqu&apos;au
          <strong>déploiement.</strong>
          <br />
          <br />
          Contactez moi pour discuter de vos besoins en développement
          informatique. Ensemble, nous réaliserons votre projet numérique.
        </p>
        <router-link :to="{ name: 'me-contacter' }" class="button">
          Me contacter
        </router-link>
      </div>
    </section>

    <section
      id="skills"
      class="flex flex-col items-center bg-grey-3 py-20 space-y-10"
    >
      <h2 class="medium-title">Mes compétences</h2>
      <div class="w-full px-10 xl:px-40 space-y-10">
        <h3 class="small-title">Hard skills</h3>
        <div
          class="flex flex-col items-center justify-center space-y-3 md:flex-row md:space-y-0 md:space-x-20"
        >
          <button
            class="choice-button"
            :class="{
              'choice-button--active': hardSkillsFilter === 'advanced'
            }"
            @click="toggleFilter('advanced')"
          >
            Avancé
          </button>
          <button
            class="choice-button"
            :class="{
              'choice-button--active': hardSkillsFilter === 'intermediate'
            }"
            @click="toggleFilter('intermediate')"
          >
            Intermédiaire
          </button>
          <button
            class="choice-button"
            :class="{
              'choice-button--active': hardSkillsFilter === 'beginner'
            }"
            @click="toggleFilter('beginner')"
          >
            Débutant
          </button>
        </div>
        <div
          class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4"
        >
          <div
            v-for="(hardSkill, index) in filteredHardSkills"
            :key="index"
            class="flex flex-col items-center"
          >
            <SvgDisplayer
              :svg="hardSkill.svg"
              :size="60"
              :class="
                hardSkill.mastery === 'advanced'
                  ? 'fill-primary'
                  : 'fill-grey-1'
              "
            />
            <span class="text-sm">{{ hardSkill.name }}</span>
          </div>
        </div>
        <FetchDataDisplayer
          :is-loading="hardskillIsLoading"
          :has-data="filteredHardSkills.length !== 0"
        />

        <h3 class="small-title">Soft skills</h3>
        <div
          class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-4"
        >
          <div
            v-for="(softSkill, index) in softSkills"
            :key="index"
            class="flex flex-col items-center"
          >
            <SvgDisplayer :svg="softSkill.svg" :size="60" class="fill-grey-1" />
            <span class="text-sm">{{ softSkill.name }}</span>
          </div>
        </div>
        <FetchDataDisplayer
          :is-loading="softskillIsLoading"
          :has-data="isDefined(softSkills) && softSkills.length !== 0"
        />
      </div>
    </section>

    <section
      id="favorite-projects"
      class="flex flex-col items-center py-20 space-y-20"
    >
      <h2 class="medium-title">Mes projets favoris</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20">
        <ExperienceDisplayer
          v-for="(project, index) in favoriteProjects"
          :key="index"
          :experience="project"
        />
      </div>
      <FetchDataDisplayer
        :is-loading="experienceIsLoading"
        :has-data="isDefined(favoriteProjects) && favoriteProjects.length !== 0"
      />
      <router-link :to="{ name: 'mon-parcours' }" class="button mb-4">
        Voir mon parcours
      </router-link>
    </section>
  </main>
</template>
