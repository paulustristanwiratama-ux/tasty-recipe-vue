<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5;">
    <div style="background-color: #ffffff; width: 400px; min-height: 100vh;" class="p-5 m-auto login-form">
      <div class="text-center">
        <img src="../../assets/images/Logo.png" alt="Logo" />
        <h2 class="mt-4">Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>
      <form>
        <base-input type="email" identity="email" placeholder="Your email adress" label="Email">
        </base-input><!-- Email -->

        <base-input type="password" identity="password" placeholder="Your password" label="Password">
        </base-input><!-- Password -->
      </form>

      <base-button
        class="login w-100 my-3">Login
      </base-button>

      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don't have an account?<span style="color: #4c4ddc">
            <RouterLink to="/signup" class="text-decoration-none">Sign Up</RouterLink></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import BaseButton from "../ui/BaseButton.vue";
  import BaseInput from "../ui/BaseInput.vue";
</script>