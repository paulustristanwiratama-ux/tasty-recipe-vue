<template>
    <div class="col-12 col-sm-8">
        <recipe-description></recipe-description>
        <recipe-ingredients></recipe-ingredients>
        <recipe-directions></recipe-directions>
    </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import RecipeDirections from "./RecipeDirections.vue"
import RecipeIngredient from "./RecipeIngredients.vue"
import RecipeDescsription from "./RecipeDescription.vue"

const store = useStore()
const route = useRoute()

onMounted(async () => {
    await store.dispatch(
        "recipe/getRecipeDetail", route.params.id
    )
})
</script>