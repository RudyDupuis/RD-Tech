<script setup lang="ts">
defineProps<{
  id: string;
}>();
const date = defineModel<Date | null>({
  required: true
});

const dateStringForInput = computed({
  get() {
    return isNotNull(date.value) ? date.value.toISOString().split("T")[0] : "";
  },
  set(value: string) {
    date.value = value !== "" ? new Date(value) : null;
  }
});
</script>

<template>
  <input :id="id" v-model="dateStringForInput" type="date" />
</template>
