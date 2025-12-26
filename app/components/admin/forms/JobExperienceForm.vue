<script setup lang="ts">
const jobExperience = defineModel<EditJobExperience>({
  required: true
});
</script>

<template>
  <label for="name">Nom</label>
  <input id="name" v-model="jobExperience.name" autocomplete="off" />

  <label for="shortDescription">Description courte</label>
  <textarea
    id="shortDescription"
    v-model="jobExperience.shortDescription"
    rows="3"
  />

  <label for="startDate">Date de début</label>
  <DateInput id="startDate" v-model="jobExperience.startDate" />

  <label for="endDate">Date de fin (optionnelle)</label>
  <DateInput id="endDate" v-model="jobExperience.endDate" />

  <ImageUploader v-model="jobExperience.thumbnail" label="Miniature" />
</template>
