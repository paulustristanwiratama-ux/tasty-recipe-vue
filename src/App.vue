<template>
  <div>
    <web-header></web-header>
    <router-view></router-view>
    <web-footer></web-footer>
  </div>
</template>

<script>
import HomePage from "./components/pages/HomePage.vue";
import WebFooter from "./components/footer/WebFooter.vue";
import WebHeader from "./components/header/WebHeader.vue";

export default {
  components: {
    HomePage,
    WebHeader,
    WebFooter
  }
}
</script>

<style scoped>

</style>
