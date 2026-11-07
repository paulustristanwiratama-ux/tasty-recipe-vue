<template>
  <div class="container-md my-5 py-5">
    <div class="row">
      <UserMenu :active-section="route.params.component" @changeComponent="changeSection" />
      <main class="col-lg-9">
        <component :is="sections[route.params.component] || PersonalInfo" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import UserMenu from '../user/UserMenu.vue';
import PersonalInfo from '../user/PersonalInfo.vue';
import FavoriteRecipe from '../user/FavoriteRecipe.vue';
import UserRecipe from '../user/UserRecipe.vue';

const route = useRoute();
const router = useRouter();
const sections = {
  'personal-info': PersonalInfo,
  'favorite-recipes': FavoriteRecipe,
  'user-recipe': UserRecipe,
};

function changeSection(component) {
  router.push({ name: 'userPage', params: { component } });
}
</script>
