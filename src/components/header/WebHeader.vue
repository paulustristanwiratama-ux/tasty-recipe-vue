<script setup>
import NavigationBar from './NavigationBar.vue';
</script>

<template>
    <header class="shadow-sm container-fluid bg-white py-3 border-bottom">
        <div class="container-md d-flex justify-content-between align-items-center">
            <RouterLink to="/" aria-label="Tasty Recipe home">
                <img src="@/assets/images/Logo.png" alt="Logo" />
            </RouterLink>
            <NavigationBar />
        </div>
    </header>
</template>
