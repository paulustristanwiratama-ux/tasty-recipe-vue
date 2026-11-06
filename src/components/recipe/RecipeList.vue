<template>
  <div class="recipe__list-recipe row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3" style="padding-top: 12px; padding-bottom: 12px">
    <div class="col" v-for="recipe in recipes" :key="recipe.id">
      <div class="card h-100">
        <img :src="recipe.imageLink" class="card-img-top" :alt="recipe.name" height="240" style="object-fit: cover" />
        <div class="card-body d-flex flex-column" style="color: #0a0a0a">
          <p class="mb-0">{{ recipe.category }}</p>
          <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
          <RouterLink :to="`/recipe/${recipe.id}`" class="btn rounded-pill login w-100 mt-auto mb-3">Detail</RouterLink>
          <p class="mb-0">Recipe By {{ recipe.username }}</p>
        </div>
        <div class="position-absolute text-secondary bg-light px-2 py-1 rounded-circle top-0 end-0 m-4 like-icon">
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipes: Array
})
</script>
