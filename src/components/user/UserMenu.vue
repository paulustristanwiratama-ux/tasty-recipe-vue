<template>
  <aside class="col-lg-3 mb-4" aria-label="User sections">
    <div class="list-group">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="list-group-item list-group-item-action"
        @click="emit('changeComponent', item.id)"
      >
        {{ item.label }}
      </button>
    </div>
  </aside>
</template>

<script setup>
const emit = defineEmits(['changeComponent']);

const items = [
  { id: 'personal-info', label: 'Personal Info' },
  { id: 'favorite-recipes', label: 'Favorited Recipes' },
  { id: 'user-recipe', label: 'My Recipes' },
];
</script>
