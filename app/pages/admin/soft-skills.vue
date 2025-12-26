<template>
  <AdminLayout
    page-title="Gérer les soft skills"
    :previous-pages="[{ text: 'Administration', href: '/admin' }]"
  >
    <AdminCrudInterface entity-name="soft-skill" />
  </AdminLayout>
</template>
