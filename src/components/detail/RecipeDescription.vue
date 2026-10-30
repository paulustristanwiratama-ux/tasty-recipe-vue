<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";


const store = useStore()

const recipeDetail = computed(() => {
    return store.state.recipe.recipeDetail
})
</script>