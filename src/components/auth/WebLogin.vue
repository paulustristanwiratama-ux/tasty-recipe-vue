<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div class="p-5 m-auto login-form" style="background-color: #fff; width: 100%; max-width: 400px">
      <div class="text-center">
        <img src="../../assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>

      <form @submit.prevent="login">
        <base-input
          v-model="loginData.email"
          type="email"
          identity="email"
          label="Email"
          placeholder="Your email address"
          autocomplete="email"
          required
        />
        <base-input
          v-model="loginData.password"
          type="password"
          identity="password"
          label="Password"
          placeholder="Your password"
          autocomplete="current-password"
          class="mt-3"
          required
        />
        <p v-if="errorMessage" class="text-danger mt-3" role="alert">{{ errorMessage }}</p>
        <base-button type="submit" class="login w-100 my-3" :disabled="submitting">
          {{ submitting ? 'Logging in...' : 'Login' }}
        </base-button>
      </form>

      <p class="text-center fw-semibold mt-4">
        Don't have an account? <RouterLink to="/signup">Sign Up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';

const router = useRouter();
const store = useStore();
const loginData = reactive({ email: '', password: '' });
const submitting = ref(false);
const errorMessage = ref('');

async function login() {
  errorMessage.value = '';
  submitting.value = true;

  try {
    await store.dispatch('auth/login', loginData);
    await router.push('/');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    submitting.value = false;
  }
}
</script>
