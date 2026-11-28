<template>
  <div>
    <label v-if="label" :for="identity" class="fw-semibold">
      {{ label }}<span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>
    <select
      :id="identity"
      class="form-select"
      :value="modelValue"
      :required="required"
      :aria-label="ariaLabel"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="item in data" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  data: { type: Array, required: true },
  identity: { type: String, required: true },
  label: String,
  modelValue: [String, Number],
  required: Boolean,
  ariaLabel: String,
});

defineEmits(['update:modelValue']);
</script>
