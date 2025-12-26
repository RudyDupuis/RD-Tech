<template>
  <AdminLayout
    page-title="Gérer les formations"
    :previous-pages="[{ text: 'Administration', href: '/admin' }]"
  >
    <AdminCrudInterface entity-name="training-experience" />
  </AdminLayout>
</template>
