<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  hasData: boolean;
}>();
</script>

<template>
  <Loader v-if="isLoading" />
  <p v-if="!hasData && !isLoading" class="text-center text-false">
    Aucune donnée disponible.
  </p>
</template>
