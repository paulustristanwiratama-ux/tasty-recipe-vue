<template>
  <section class="card" aria-labelledby="my-recipes-title">
    <div class="card-header bg-white py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
      <div>
        <h1 id="my-recipes-title" class="h4 mb-1">My Recipes</h1>
        <p class="text-muted mb-0">Add your original recipe here</p>
      </div>
      <RouterLink :to="{ name: 'newRecipePage' }" class="btn add-btn rounded-pill px-3 py-2">
        <i class="fa-solid fa-plus pe-1" aria-hidden="true"></i> Add Recipe
      </RouterLink>
    </div>
    <div class="card-body">
      <p class="fs-5 fw-semibold">Recipe</p>
      <p v-if="errorMessage" class="text-danger" role="alert">{{ errorMessage }}</p>
      <div v-if="recipes.length" class="row g-3">
        <div v-for="recipe in recipes" :key="recipe.id" class="col-md-6">
          <UserRecipeCard
            :recipe="recipe"
            :button-name="['Delete', 'Edit']"
            @remove="deleteRecipe(recipe.id)"
          >
            <p class="mb-0">{{ formatDate(recipe.createdAt) }}</p>
          </UserRecipeCard>
        </div>
      </div>
      <p v-else class="mb-0">No recipes yet.</p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import UserRecipeCard from './UserRecipeCard.vue';

const store = useStore();
const errorMessage = ref('');

const recipes = computed(() => {
  const userId = store.state.auth.userId || store.state.auth.userLogin.userId;
  return store.state.recipe.recipes.filter((recipe) => recipe.userId === userId);
});

function formatDate(value) {
  return value ? new Date(value).toDateString() : '—';
}

async function deleteRecipe(id) {
  errorMessage.value = '';
  try {
    await store.dispatch('recipe/deleteRecipe', id);
  } catch (error) {
    errorMessage.value = error.message;
  }
}

onMounted(() => {
  store.dispatch('recipe/getRecipeData');
});
</script>
