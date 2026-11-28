<template>
  <li class="list-group-item">
    <RouterLink
      to="/user/user-recipe"
      class="h4 text-decoration-none d-inline-flex align-items-center gap-2"
    >
      <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
      {{ isEdit ? 'Edit Recipe' : 'Add Recipe' }}
    </RouterLink>
    <p class="text-muted mt-2 mb-0">
      Uploading personal recipes is easy! Add yours to your favorites, share with friends, family,
      or the Allrecipes community.
    </p>
  </li>
</template>

<script setup>
defineProps({
  isEdit: { type: Boolean, default: false },
});
</script>
