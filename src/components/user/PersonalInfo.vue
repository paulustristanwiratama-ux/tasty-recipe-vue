<template>
  <section class="card" aria-labelledby="personal-info-title">
    <div class="card-header bg-white py-3">
      <h1 id="personal-info-title" class="h4 mb-1">Personal Info</h1>
      <p class="text-muted mb-0">Your account details</p>
    </div>
    <div class="card-body">
      <h2 class="h5 mb-4">My Basic Info</h2>
      <dl class="row mb-0">
        <dt class="col-sm-4">First name</dt>
        <dd class="col-sm-8">{{ user.firstname || '—' }}</dd>
        <dt class="col-sm-4">Last name</dt>
        <dd class="col-sm-8">{{ user.lastname || '—' }}</dd>
        <dt class="col-sm-4">Username</dt>
        <dd class="col-sm-8">{{ user.username || '—' }}</dd>
        <dt class="col-sm-4">Email</dt>
        <dd class="col-sm-8">{{ user.email || '—' }}</dd>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.state.auth.userLogin);
</script>
