<template>
  <div class="recipe__list-recipe row" style="padding-top: 12px; padding-bottom: 12px">
    <div class="card text-decoration-none" style="height: 398px" v-for="recipe in recipes" :key="recipe.id">
      <img :src="recipe.imageLink" class="card-img-top" alt="Food" height="240" width="285" style="object-fit: cover" />
      <div class="card-body" style="color: #0a0a0a">
        <p class="mb-0">{{ recipe.category }}</p>
        <div class="h-50">
          <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
        </div>
        <RouterLink to="/recipe/recipe.id" class="text-decoration-none"><base-button class="login w-100 my-3">Detail
          </base-button></RouterLink>
        <p>Recipe By {{ recipe.username }}</p>
      </div>
    </div>
    <div class="position-absolute text-secondary bg-light px-2 py-1 rounded-circle top-0 end-0 m-4 like-icon">
      <i class="fas fa-heart"></i>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue';
defineProps({
  recipes: Array
})

</script>
