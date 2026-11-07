<template>
  <div>
    <label :for="identity" class="fw-semibold">
      {{ label }}<span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>
    <input
      :id="identity"
      class="form-control"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readonly === '1'"
      :required="required"
      :minlength="minlength"
      :accept="accept"
      :autocomplete="autocomplete"
      :aria-describedby="describedby"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
  identity: { type: String, required: true },
  placeholder: String,
  modelValue: [String, Number],
  readonly: { type: String, default: '0' },
  required: Boolean,
  minlength: Number,
  accept: String,
  autocomplete: String,
  describedby: String,
});

defineEmits(['update:modelValue', 'change']);
</script>
