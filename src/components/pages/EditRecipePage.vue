<template>
  <main>
    <div class="container-md my-5 py-5">
      <p v-if="isLoading" class="text-muted">Loading recipe...</p>
      <RecipeForm v-else-if="hasDetail" :key="route.params.id" :is-edit="true" />
      <div v-else class="alert alert-warning" role="alert">Recipe not found.</div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import RecipeForm from '../recipeForm/RecipeForm.vue';

const store = useStore();
const route = useRoute();
const detailData = ref(null);
const isLoading = ref(false);
const hasDetail = computed(
  () => detailData.value && Object.keys(detailData.value).length > 0,
);

async function loadRecipe() {
  isLoading.value = true;
  detailData.value = null;
  try {
    store.commit('recipe/setRecipeDetail', {});
    await store.dispatch('recipe/getRecipeDetail', route.params.id);
    detailData.value = store.state.recipe.recipeDetail;
  } finally {
    isLoading.value = false;
  }
}

watch(() => route.params.id, loadRecipe, { immediate: true });
</script>
