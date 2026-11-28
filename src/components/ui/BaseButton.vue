<template>
  <button :type="type" class="btn rounded-pill">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
});
</script>
