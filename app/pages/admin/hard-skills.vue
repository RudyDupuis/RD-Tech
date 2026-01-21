<template>
  <AdminLayout
    page-title="Gérer les hard skills"
    :previous-pages="[{ text: 'Administration', href: '/admin' }]"
  >
    <AdminCrudInterface entity-name="hard-skill" />
  </AdminLayout>
</template>
