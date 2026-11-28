<template>
  <ul class="list-group">
    <RecipeFormHeader :is-edit="isEdit" />
    <RecipeFormBody :is-edit="isEdit" />
  </ul>
</template>

<script setup>
import RecipeFormHeader from './RecipeFormHeader.vue';
import RecipeFormBody from './RecipeFormBody.vue';

defineProps({
  isEdit: { type: Boolean, default: false },
});
</script>
