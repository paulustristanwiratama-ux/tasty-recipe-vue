<template>
  <div>
    <label v-if="label" :for="identity" class="fw-semibold">
      {{ label }}<span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>
    <textarea
      :id="identity"
      class="form-control"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      :rows="rows"
      :aria-label="ariaLabel"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  identity: { type: String, required: true },
  label: String,
  placeholder: String,
  modelValue: String,
  required: Boolean,
  rows: { type: [String, Number], default: 3 },
  ariaLabel: String,
});

defineEmits(['update:modelValue']);
</script>
