<script setup lang="ts">
withDefaults(
  defineProps<{
    skill: HardSkill | SoftSkill;
    svgClass?: string;
    size?: number;
  }>(),
  { svgClass: "", size: 60 }
);
</script>

<template>
  <div class="flex flex-col items-center">
    <SvgDisplayer :svg="skill.svg" :size="size" :class="svgClass" />
    <span class="text-sm">{{ skill.name }}</span>
  </div>
</template>
