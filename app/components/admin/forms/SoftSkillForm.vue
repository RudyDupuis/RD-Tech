<script setup lang="ts">
const softSkill = defineModel<EditSoftSkill>({ required: true });
</script>

<template>
  <label for="name">Nom</label>
  <input id="name" v-model="softSkill.name" autocomplete="off" />

  <SvgUploader v-model="softSkill.svg" />
</template>
