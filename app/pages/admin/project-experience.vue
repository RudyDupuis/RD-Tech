<template>
  <AdminLayout
    page-title="Gérer les projets"
    :previous-pages="[{ text: 'Administration', href: '/admin' }]"
  >
    <AdminCrudInterface entity-name="project-experience" />
  </AdminLayout>
</template>
