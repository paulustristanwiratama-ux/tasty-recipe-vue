<template>
  <li class="list-group-item">
    <form novalidate @submit.prevent="submitRecipe">
      <h2 class="h5 mb-3">General Information</h2>

      <div class="mb-3">
        <BaseInput
          type="file"
          identity="recipeImage"
          :label="isEdit ? 'Choose Recipe Photo' : 'Photo Recipe'"
          accept="image/*"
          :required="!isEdit"
          @change="checkImage"
        />
        <img
          v-if="recipeData.imageLink"
          :src="recipeData.imageLink"
          :alt="recipeData.name || 'Recipe photo'"
          class="image"
        />
      </div>

      <BaseInput
        v-model="recipeData.name"
        type="text"
        identity="recipeTitle"
        label="Recipe Title"
        placeholder="Give your recipe a title"
        required
        class="mb-3"
      />

      <BaseTextArea
        v-model="recipeData.description"
        identity="recipeDescription"
        label="Description"
        placeholder="Share story behind recipe and what is make it special"
        required
        class="mb-3"
      />

      <BaseSelect
        v-model="recipeData.category"
        :data="categories"
        identity="recipeCategory"
        label="Category"
        required
        class="mb-3"
      />

      <h2 class="h5 mt-4 mb-3">Time Setting</h2>

      <BaseInput
        v-model="recipeData.prepTime"
        type="number"
        identity="prepTime"
        label="Prep Time"
        placeholder="0"
        min="0"
        required
        class="mb-3"
      />

      <BaseInput
        v-model="recipeData.cookTime"
        type="number"
        identity="cookTime"
        label="Cook Time"
        placeholder="0"
        min="0"
        required
        class="mb-3"
      />

      <BaseInput
        :model-value="totalTime"
        type="number"
        identity="totalTime"
        label="Total Time"
        placeholder="0"
        readonly="1"
        class="mb-3"
      />

      <h2 class="h5 mt-4 mb-3">Ingredients</h2>
      <p class="text-muted small">
        Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special
        preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different
        parts of the recipe (i.e. Cake, Frosting, Dressing).
      </p>

      <div
        v-for="(ingredient, index) in recipeData.ingredients"
        :key="`ingredient-${index}`"
        class="mb-2 row g-2 align-items-end"
      >
        <div class="col-10 col-md-11">
          <BaseInput
            v-model="recipeData.ingredients[index]"
            type="text"
            :identity="`ingredient-${index}`"
            :label="index === 0 ? 'Ingredient' : ''"
            :aria-label="`Ingredient ${index + 1}`"
            placeholder="Ex : 1 cup sugar"
            required
          />
        </div>
        <div v-if="recipeData.ingredients.length > 1" class="col-2 col-md-1">
          <button
            type="button"
            class="btn btn-link text-danger p-0 mb-2 text-decoration-none"
            :aria-label="`Delete ingredient ${index + 1}`"
            @click="deleteIngredient(index)"
          >
            <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
            <span class="d-none d-md-inline ms-1">Delete</span>
          </button>
        </div>
      </div>

      <BaseButton type="button" class="new-ingredient-btn px-3 py-2" @click="addIngredient">
        <i class="fa-solid fa-plus me-2" aria-hidden="true"></i>Add More
      </BaseButton>

      <h2 class="h5 mt-4 mb-3">Directions</h2>
      <p class="text-muted small">
        Explain how to make your recipe, including oven temperatures, baking or cooking times, and
        pan sizes, etc. Use optional headers to organize the different parts of the recipe.
      </p>

      <div
        v-for="(direction, index) in recipeData.directions"
        :key="`direction-${index}`"
        class="mb-2 row g-2 align-items-end"
      >
        <div class="col-10 col-md-11">
          <BaseInput
            v-model="recipeData.directions[index]"
            type="text"
            :identity="`direction-${index}`"
            :label="index === 0 ? 'Direction' : ''"
            :aria-label="`Direction ${index + 1}`"
            placeholder="Ex : Mix the flour and sugar"
            required
          />
        </div>
        <div v-if="recipeData.directions.length > 1" class="col-2 col-md-1">
          <button
            type="button"
            class="btn btn-link text-danger p-0 mb-2 text-decoration-none"
            :aria-label="`Delete direction ${index + 1}`"
            @click="deleteDirection(index)"
          >
            <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
            <span class="d-none d-md-inline ms-1">Delete</span>
          </button>
        </div>
      </div>

      <BaseButton type="button" class="new-ingredient-btn px-3 py-2" @click="addDirection">
        <i class="fa-solid fa-plus me-2" aria-hidden="true"></i>Add More
      </BaseButton>

      <p v-if="errorMessage" class="text-danger mt-3" role="alert">{{ errorMessage }}</p>

      <div class="d-flex justify-content-end gap-2 mt-4">
        <BaseButton type="button" class="cancel-btn px-3 py-2" @click="cancel">
          Cancel
        </BaseButton>
        <BaseButton type="submit" class="submit-recipe-btn px-3 py-2" :disabled="submitting">
          {{ submitting ? 'Saving...' : 'Submit' }}
        </BaseButton>
      </div>
    </form>
  </li>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import BaseTextArea from '../ui/BaseTextArea.vue';

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

const store = useStore();
const route = useRoute();
const router = useRouter();
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks'];
const submitting = ref(false);
const errorMessage = ref('');

const recipeData = reactive({
  imageLink: '',
  name: '',
  description: '',
  category: 'Breakfast',
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [''],
  directions: [''],
  createdAt: null,
  likes: [],
  userId: null,
  username: '',
});

const totalTime = computed(
  () => Number(recipeData.prepTime || 0) + Number(recipeData.cookTime || 0),
);

onMounted(() => {
  if (!props.isEdit) return;

  const detail = store.state.recipe.recipeDetail;
  if (!detail || !Object.keys(detail).length) return;

  Object.assign(recipeData, {
    ...detail,
    ingredients:
      Array.isArray(detail.ingredients) && detail.ingredients.length
        ? [...detail.ingredients]
        : [''],
    directions:
      Array.isArray(detail.directions) && detail.directions.length
        ? [...detail.directions]
        : [''],
    likes: detail.likes || [],
  });
});

function checkImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  recipeData.imageLink = '';
  errorMessage.value = '';

  if (!file.type.startsWith('image/') || file.size > 1_000_000) {
    errorMessage.value = 'Choose an image smaller than 1 MB.';
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    recipeData.imageLink = reader.result;
  });
  reader.addEventListener('error', () => {
    errorMessage.value = 'Unable to read the recipe photo.';
  });
  reader.readAsDataURL(file);
}

function addIngredient() {
  recipeData.ingredients.push('');
}

function deleteIngredient(index) {
  if (recipeData.ingredients.length === 1) return;
  recipeData.ingredients.splice(index, 1);
}

function addDirection() {
  recipeData.directions.push('');
}

function deleteDirection(index) {
  if (recipeData.directions.length === 1) return;
  recipeData.directions.splice(index, 1);
}

function cancel() {
  router.push('/user/user-recipe');
}

function buildPayload() {
  return {
    ...recipeData,
    name: String(recipeData.name || '').trim(),
    description: String(recipeData.description || '').trim(),
    prepTime: Number(recipeData.prepTime) || 0,
    cookTime: Number(recipeData.cookTime) || 0,
    totalTime: totalTime.value,
    ingredients: recipeData.ingredients
      .map((item) => String(item || '').trim())
      .filter(Boolean),
    directions: recipeData.directions
      .map((item) => String(item || '').trim())
      .filter(Boolean),
  };
}

async function submitRecipe() {
  errorMessage.value = '';
  const payload = buildPayload();

  if (!payload.imageLink) {
    errorMessage.value = 'Choose a recipe photo.';
    return;
  }
  if (!payload.name || !payload.description || !payload.category) {
    errorMessage.value = 'Fill in the recipe title, description, and category.';
    return;
  }
  if (!payload.ingredients.length || !payload.directions.length) {
    errorMessage.value = 'Add at least one ingredient and one direction.';
    return;
  }

  submitting.value = true;
  try {
    if (props.isEdit) {
      await store.dispatch('recipe/updateRecipe', {
        id: route.params.id,
        newRecipe: payload,
      });
    } else {
      await store.dispatch('recipe/addNewRecipe', payload);
    }
    await router.push('/user/user-recipe');
  } catch (error) {
    errorMessage.value = error.message || 'Unable to save the recipe. Please try again.';
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-top: 0.5rem;
}
</style>
