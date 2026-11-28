<template>
  <div :class="{ 'input-wrapper': type === 'file' }">
    <label v-if="label" :for="identity" class="fw-semibold">
      {{ label }}<span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>
    <input
      :id="identity"
      :class="[{ 'file-input': type === 'file' }, 'form-control']"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readonly === '1'"
      :required="required"
      :minlength="minlength"
      :min="min"
      :accept="accept"
      :autocomplete="autocomplete"
      :aria-describedby="describedby"
      :aria-label="ariaLabel"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, required: true },
  label: String,
  identity: { type: String, required: true },
  placeholder: String,
  modelValue: [String, Number],
  readonly: { type: String, default: '0' },
  required: Boolean,
  minlength: Number,
  min: [String, Number],
  accept: String,
  autocomplete: String,
  describedby: String,
  ariaLabel: String,
});

defineEmits(['update:modelValue', 'change']);
</script>

<style scoped>
.input-wrapper {
  padding: 0.375rem 0.75rem;
  width: 200px;
  text-align: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1px solid #ced4da;
  background-color: #ced4da;
  border-radius: 0.375rem;
  margin-bottom: 10px;
  transition: all 1s ease;
}

.input-wrapper:hover {
  background-color: #b9bec3;
}

.file-input {
  cursor: pointer;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  font-size: 50px;
  opacity: 0;
}
</style>
