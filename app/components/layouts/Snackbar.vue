<script setup lang="ts">
defineProps<{
  type: "info" | "success" | "warning" | "error";
  message: string;
  buttons: {
    title: string;
    action: () => void;
  }[];
}>();

const isOpen = ref(true);
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed bottom-4 right-4 py-6 px-8 rounded-lg shadow-lg mx-6"
    :class="{
      'bg-primary text-light': type === 'info',
      'bg-true text-dark': type === 'success',
      'bg-warning text-dark': type === 'warning',
      'bg-false text-dark': type === 'error'
    }"
  >
    <p class="whitespace-pre-line">{{ message }}</p>
    <button
      v-for="button in buttons"
      :key="button.title"
      class="ml-4 underline cursor-pointer hover:text-secondary"
      @click="button.action"
    >
      {{ button.title }}
    </button>
    <button
      class="ml-4 absolute top-2 right-4 cursor-pointer hover:text-secondary"
      @click="isOpen = false"
    >
      <i class="fa-solid fa-xmark" />
    </button>
  </div>
</template>
