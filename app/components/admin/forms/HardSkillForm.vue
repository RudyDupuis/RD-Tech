<script setup lang="ts">
const hardSkill = defineModel<EditHardSkill>({ required: true });
</script>

<template>
  <label for="name">Nom</label>
  <input id="name" v-model="hardSkill.name" autocomplete="off" />

  <SvgUploader v-model="hardSkill.svg" />

  <label for="mastery">Maitrise</label>
  <select id="mastery" v-model="hardSkill.mastery">
    <option v-for="(label, key) in masteryLabels" :key="key" :value="key">
      {{ label }}
    </option>
  </select>
</template>
