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
      <li class="dropdown-item">{{ store.state.auth.userLogin.email || 'Signed in' }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
</script>
