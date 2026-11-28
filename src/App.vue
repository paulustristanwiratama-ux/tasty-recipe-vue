<template>
  <div>
    <WebHeader />
    <router-view></router-view>
    <WebFooter />
  </div>
</template>

<script setup>
import WebFooter from './components/footer/WebFooter.vue';
import WebHeader from './components/header/WebHeader.vue';
</script>
