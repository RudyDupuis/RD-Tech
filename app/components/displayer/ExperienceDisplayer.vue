<script setup lang="ts">
defineProps<{
  experience: Experience;
}>();
function hasSlug(
  experience: Experience
): experience is Experience & { slug: string } {
  if ("slug" in experience) {
    return true;
  }
  return false;
}
</script>

<template>
  <div class="flex flex-col items-center max-w-xs">
    <img
      v-if="isNotNull(experience.thumbnail)"
      :src="experience.thumbnail"
      :alt="'Miniature de ' + experience.name"
      class="w-80 border-2 border-grey-1 select-none mb-5"
    />
    <p class="font-primary-bold text-center">{{ experience.name }}</p>
    <p class="text-medium mb-5">
      {{ formatExperienceDate(experience.startDate, experience.endDate) }}
    </p>
    <p class="mb-2">{{ experience.shortDescription }}</p>
    <router-link
      v-if="hasSlug(experience)"
      :to="{ path: `/projet/${experience.slug}` }"
      class="text-primary"
    >
      En savoir plus ➜
    </router-link>
  </div>
</template>
