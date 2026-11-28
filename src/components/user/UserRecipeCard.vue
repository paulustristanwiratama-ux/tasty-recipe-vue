<template>
  <div class="card h-100">
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between gap-3">
        <div>
          <p class="mb-0 text-muted">{{ recipe.category }}</p>
          <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
          <slot></slot>
        </div>
        <div class="d-flex">
          <img
            v-if="recipe.imageLink"
            :src="recipe.imageLink"
            :alt="recipe.name"
            width="90"
            height="80"
            class="rounded"
            style="object-fit: cover"
          />
        </div>
      </div>
      <div class="d-flex gap-2 justify-content-between mt-3 pt-3 border-top">
        <button
          type="button"
          class="btn delete-btn flex-fill px-3 py-2 rounded-pill"
          style="width: auto"
          @click="emit('remove')"
        >
          {{ buttonName[0] }}
        </button>
        <RouterLink
          :to="{ name: 'editRecipePage', params: { id: recipe.id } }"
          class="btn edit-btn flex-fill px-3 py-2 rounded-pill"
          style="width: auto"
        >
          {{ buttonName[1] }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: { type: Object, required: true },
  buttonName: { type: Array, default: () => ['Delete', 'Edit'] },
});

const emit = defineEmits(['remove']);
</script>
