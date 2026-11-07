<template>
    <nav class="header d-flex align-items-center justify-content-end gap-3 ms-auto flex-grow-1" aria-label="Main navigation">
        <SearchMenu />
        <SignupMenu />
    </nav>
</template>

<script setup>
import SearchMenu from './SearchMenu.vue';
import SignupMenu from './SignupMenu.vue';
</script>
