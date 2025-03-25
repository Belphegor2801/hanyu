<template>
  <div class="h-input" :style="{ width: width !== 0 ? width + 'px' : '100%' }">
    <label v-if="label">{{ label }}</label>
    <input
      ref="input"
      type="text"
      class="h-input-item"
      v-model="inputValue"
      @input="onInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
    />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: "HInput",
  props: {
    modelValue: {
      default: null
    },
    width: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Nhập nội dung",
    },
    maxLength: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue); // Create a reactive reference for the input value
    const error = ref("");

    // Watch for changes in modelValue prop to update inputValue
    watch(() => props.modelValue, (newValue) => {
      inputValue.value = newValue;
    });

    const onInput = () => {
      if (inputValue.value.trim() === "") {
        error.value = "Input cannot be empty."; // Example error message
      } else {
        error.value = "";
      }
      emit("update:modelValue", inputValue.value); // Emit the updated value
    };

    return {
      inputValue,
      error,
      onInput,
    };
  },
};
</script>

<style lang="scss" scoped>
.h-input {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  label {
    margin-bottom: 4px;
    font-weight: bold;
  }

  .h-input-item {
    height: 26px;
    width: 100%;
    border-radius: 1px;
    border: 1px solid #333;
    padding: 2px 8px;
    background: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    &:hover, &:active {
      border: 1px solid #219134;
    }

    &:focus {
      outline: none;
      border: 1px solid #219134;
    }
  }
}

.error {
  color: red;
  font-size: 14px;
}
</style>