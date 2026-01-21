<script setup lang="ts">
const trainingExperience = defineModel<EditTrainingExperience>({
  required: true
});
</script>

<template>
  <label for="name">Nom</label>
  <input id="name" v-model="trainingExperience.name" autocomplete="off" />

  <label for="shortDescription">Description courte</label>
  <textarea
    id="shortDescription"
    v-model="trainingExperience.shortDescription"
    rows="3"
  />

  <label for="startDate">Date de début</label>
  <DateInput id="startDate" v-model="trainingExperience.startDate" />

  <label for="endDate">Date de fin (optionnelle)</label>
  <DateInput id="endDate" v-model="trainingExperience.endDate" />

  <ImageUploader v-model="trainingExperience.thumbnail" label="Miniature" />
</template>
