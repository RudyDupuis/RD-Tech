<template>
  <AdminLayout page-title="Administration">
    <div class="flex flex-col gap-5">
      <NuxtLink to="/admin/soft-skills" class="button">
        Gérer les soft skills
      </NuxtLink>
      <NuxtLink to="/admin/hard-skills" class="button">
        Gérer les hard skills
      </NuxtLink>
      <NuxtLink to="/admin/project-experience" class="button">
        Gérer les projets
      </NuxtLink>
      <NuxtLink to="/admin/job-experience" class="button">
        Gérer les expériences professionnelles
      </NuxtLink>
      <NuxtLink to="/admin/training-experience" class="button">
        Gérer les formations
      </NuxtLink>
    </div>
  </AdminLayout>
</template>
