<script setup lang="ts">
withDefaults(
  defineProps<{
    svg: string;
    size?: number;
  }>(),
  { size: 60 }
);
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <svg :width="size" :height="size" viewBox="0 0 80 80" v-html="svg" />
</template>
