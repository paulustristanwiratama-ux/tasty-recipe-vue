<template>
    <div class="my-3">
        <div class="card">
            <div class="card-header">
                <p class="fs-4 my-0 fw-semibold">Ingredients</p>
            </div>
            <div class="card-body">
                <div v-for="(direction, index) in recipeDetail.directions" :key="index">
                    <p class="my-2 fs-5 fw-semibold">
                        Step {{ index + 1 }}
                    </p>
                    <p class="my-2">{{ direction }}</p>
                    <ul class="mb-0">
                        <li v-for="(ingredient, index) in recipeDetail.ingredients" :key="index">
                            {{ ingredient }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setupt>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

const recipeDetail = computed(() => {
    return store.state.recipe.recipeDetail
})
</script>