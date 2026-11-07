<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn d-flex align-items-center gap-2 fw-semibold text-nowrap"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fa-solid fa-user" aria-hidden="true"></i>
      <span>My Profile</span>
      <i class="fa-solid fa-caret-down" aria-hidden="true"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <button type="button" class="dropdown-item" @click="logout">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

function logout() {
  store.commit('auth/logout');
  router.push('/');
}
</script>
