<template>
  <AdminLayout
    page-title="Gérer les expériences professionnelles"
    :previous-pages="[{ text: 'Administration', href: '/admin' }]"
  >
    <AdminCrudInterface entity-name="job-experience" />
  </AdminLayout>
</template>
