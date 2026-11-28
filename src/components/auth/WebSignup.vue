<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div class="p-5 m-auto signup-form" style="background-color: #fff">
      <div class="text-center">
        <img src="../../assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>

      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <base-input
            v-model="signupData.firstname"
            type="text"
            identity="firstname"
            label="Firstname"
            placeholder="Ex: Jack"
            autocomplete="given-name"
            class="col-sm-6"
            required
          />
          <base-input
            v-model="signupData.lastname"
            type="text"
            identity="lastname"
            label="Lastname"
            placeholder="Ex: Daniel"
            autocomplete="family-name"
            class="col-sm-6"
            required
          />
        </div>
        <base-input
          v-model="signupData.username"
          type="text"
          identity="username"
          label="Username"
          placeholder="Your username"
          autocomplete="username"
          class="mt-3"
          required
        />
        <base-input
          v-model="signupData.email"
          type="email"
          identity="signup-email"
          label="Email"
          placeholder="Your email address"
          autocomplete="email"
          class="mt-3"
          required
        />
        <base-input
          v-model="signupData.password"
          type="password"
          identity="signup-password"
          label="Password"
          placeholder="Your password"
          autocomplete="new-password"
          describedby="password-help"
          :minlength="8"
          class="mt-3"
          required
        />
        <p id="password-help" class="small mb-0" :class="signupData.password && signupData.password.length < 8 ? 'text-danger' : 'text-muted'">
          Use at least 8 characters.
        </p>
        <base-input
          v-model="signupData.confirmationPassword"
          type="password"
          identity="confirmation-password"
          label="Confirm Password"
          placeholder="Repeat your password"
          autocomplete="new-password"
          describedby="confirmation-help"
          class="mt-3"
          required
        />
        <p id="confirmation-help" class="small mb-0" :class="signupData.confirmationPassword && !passwordsMatch ? 'text-danger' : 'text-muted'">
          {{ signupData.confirmationPassword ? (passwordsMatch ? 'Passwords match.' : 'Passwords do not match.') : 'Repeat your password to confirm it.' }}
        </p>
        <base-input
          type="file"
          identity="profile-photo"
          label="Profile Photo (optional)"
          accept="image/*"
          class="mt-3"
          @change="checkImage"
        />
        <img
          v-if="signupData.imageLink"
          :src="signupData.imageLink"
          alt="Profile photo preview"
          class="rounded-circle mt-2"
          width="140"
          height="140"
          style="object-fit: cover"
        />
        <p v-if="errorMessage" class="text-danger mt-3" role="alert">{{ errorMessage }}</p>
        <base-button type="submit" class="login w-100 my-3" :disabled="submitting">
          {{ submitting ? 'Registering...' : 'Register' }}
        </base-button>
      </form>

      <p class="text-center fw-semibold mt-4">
        Already have an account? <RouterLink to="/login">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';

const router = useRouter();
const store = useStore();
const signupData = reactive({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  confirmationPassword: '',
  imageLink: '',
});
const passwordsMatch = computed(() => signupData.password === signupData.confirmationPassword);
const submitting = ref(false);
const errorMessage = ref('');

function checkImage(event) {
  const file = event.target.files?.[0];
  signupData.imageLink = '';
  errorMessage.value = '';
  if (!file) return;

  if (!file.type.startsWith('image/') || file.size > 1_000_000) {
    errorMessage.value = 'Choose an image smaller than 1 MB.';
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    signupData.imageLink = reader.result;
  });
  reader.addEventListener('error', () => {
    errorMessage.value = 'Unable to read the profile photo.';
  });
  reader.readAsDataURL(file);
}

async function register() {
  errorMessage.value = '';
  if (!passwordsMatch.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  submitting.value = true;
  try {
    await store.dispatch('auth/register', signupData);
    await router.push('/');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    submitting.value = false;
  }
}
</script>
