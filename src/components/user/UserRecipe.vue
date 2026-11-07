<template>
  <section class="card" aria-labelledby="my-recipes-title">
    <div class="card-header bg-white py-3">
      <h1 id="my-recipes-title" class="h4 mb-1">My Recipes</h1>
      <p class="text-muted mb-0">Your original recipes will appear here.</p>
    </div>
    <UserRecipeCard />
  </section>
</template>

<script setup>
import UserRecipeCard from './UserRecipeCard.vue';
</script>
