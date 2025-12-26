<script setup lang="ts">
defineProps<{
  pageTitle: string;
  previousPages?: Array<{ text: string; href: string }>;
}>();
</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <nav v-if="isDefined(previousPages)" aria-label="fil d'Ariane">
      <ul class="flex text-sm">
        <li v-for="(page, index) in previousPages" :key="index">
          <NuxtLink :to="page.href">
            {{ page.text }}
          </NuxtLink>
          <span class="mx-2">/</span>
        </li>
        <li>
          {{ pageTitle }}
        </li>
      </ul>
    </nav>

    <h1 class="large-title mt-10 mb-20">{{ pageTitle }}</h1>

    <slot />
  </main>
</template>
