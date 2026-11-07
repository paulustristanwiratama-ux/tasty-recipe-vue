<template>
  <aside class="col-lg-3 mb-4" aria-label="User sections">
    <div class="list-group">
      <div class="list-group-item d-flex align-items-center gap-3">
        <img
          v-if="user.imageLink"
          :src="user.imageLink"
          alt=""
          class="rounded-circle"
          width="48"
          height="48"
          style="object-fit: cover"
        />
        <i v-else class="fa-solid fa-circle-user fs-2" aria-hidden="true"></i>
        <div class="text-truncate">
          <strong class="d-block text-truncate">{{ name }}</strong>
          <small class="text-muted d-block text-truncate">{{ user.email }}</small>
        </div>
      </div>
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="list-group-item list-group-item-action"
        :class="{ active: activeSection === item.id }"
        :aria-current="activeSection === item.id ? 'page' : undefined"
        @click="emit('changeComponent', item.id)"
      >
        {{ item.label }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

defineProps({ activeSection: String });
const emit = defineEmits(['changeComponent']);
const store = useStore();
const user = computed(() => store.state.auth.userLogin);
const name = computed(() => [user.value.firstname, user.value.lastname].filter(Boolean).join(' ') || user.value.username || user.value.email || 'My Profile');

const items = [
  { id: 'personal-info', label: 'Personal Info' },
  { id: 'favorite-recipes', label: 'Favorited Recipes' },
  { id: 'user-recipe', label: 'My Recipes' },
];
</script>
