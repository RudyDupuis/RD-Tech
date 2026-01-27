<script setup lang="ts">
const projectExperience = defineModel<EditProjectExperience>({
  required: true
});
</script>

<template>
  <div class="flex items-center gap-2">
    <label for="isFavorite" class="mb-0">Projet favori</label>
    <input
      id="isFavorite"
      v-model="projectExperience.isFavorite"
      type="checkbox"
    />
  </div>

  <label for="name">Nom</label>
  <input
    id="name"
    v-model="projectExperience.name"
    autocomplete="off"
    @change="
      projectExperience.slug = projectExperience.name
        .toLowerCase()
        .normalize('NFD') // decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .replace(/[^a-z0-9]+/g, '-') // replace all non a-z or 0-9 characters with dashes
        .replace(/^-+|-+$/g, '') // remove leading or trailing dashes
    "
  />

  <label for="shortDescription">Description courte</label>
  <textarea
    id="shortDescription"
    v-model="projectExperience.shortDescription"
    rows="3"
  />

  <label for="longDescription">Description longue</label>
  <textarea
    id="longDescription"
    v-model="projectExperience.longDescription"
    rows="6"
  />

  <label for="startDate">Date de début</label>
  <DateInput id="startDate" v-model="projectExperience.startDate" />

  <label for="endDate">Date de fin (optionnelle)</label>
  <DateInput id="endDate" v-model="projectExperience.endDate" />

  <ImageUploader v-model="projectExperience.thumbnail" label="Miniature" />

  <ImageUploader
    v-model="projectExperience.images"
    label="Images du projet"
    :multiple="true"
  />

  <HardSkillSelector v-model="projectExperience.hardSkills" />

  <label for="projectLink">Lien du projet (optionnel)</label>
  <input
    id="projectLink"
    v-model="projectExperience.projectLink"
    type="url"
    autocomplete="off"
  />

  <label for="codeLink">Lien du code (optionnel)</label>
  <input
    id="codeLink"
    v-model="projectExperience.codeLink"
    type="url"
    autocomplete="off"
  />
</template>
