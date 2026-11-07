<template>
  <nav class="header d-flex align-items-center justify-content-end gap-3 ms-auto flex-grow-1" aria-label="Main navigation">
    <SearchMenu />
    <component :is="menuComponent" />
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import SearchMenu from './SearchMenu.vue';
import SignupMenu from './SignupMenu.vue';
import ProfileMenu from './ProfileMenu.vue';

const store = useStore();
const menuComponent = computed(() => store.state.auth.token ? ProfileMenu : SignupMenu);
</script>
