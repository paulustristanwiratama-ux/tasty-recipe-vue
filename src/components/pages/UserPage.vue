<template>
  <div class="container-md my-5 py-5">
    <div class="row">
      <UserMenu @changeComponent="selectedSection = $event" />
      <main class="col-lg-9">
        <h1 class="text-capitalize">{{ selectedSection.replaceAll('-', ' ') }}</h1>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserMenu from '../user/UserMenu.vue';

const selectedSection = ref('personal-info');
</script>
