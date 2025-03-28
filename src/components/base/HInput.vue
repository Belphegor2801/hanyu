<template>
  <div class="h-input"   :style="{ width: width !== 0 ? width + 'px' : '100%' }">
    <label v-if="label">{{ label }}</label>
    <input
      ref="input"
      type="text"
      class="h-input-item"
      :class="[{'has-right-icon': rightIcon}]"
      v-model="inputValue"
      @input="onInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
    />

    <div v-if="rightIcon" class="ic-right">
      <div
        :class="['icon24 icon', rightIcon, isClickRightIcon ? 'pointer' : '']"
        @click="onClickRightIcon"
      ></div>
    </div>
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "HInput",
  props: {
    modelValue: {
      default: null,
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
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rightIcon: {
      type: String,
      default: "",
    },
    isClickRightIcon: {
      type: Boolean,
      default: false,
    },
    tooltipRigthIcon: {
      type: String,
      default: "",
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue); // Create a reactive reference for the input value
    const error = ref("");

    // Watch for changes in modelValue prop to update inputValue
    watch(
      () => props.modelValue,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    const onInput = () => {
      if (inputValue.value.trim() === "") {
        error.value = ""; // Example error message
      } else {
        error.value = "";
      }
      emit("update:modelValue", inputValue.value); // Emit the updated value
    };

    const onClickRightIcon = () => {
      if (props.isClickRightIcon) {
        emit("clickRightIcon");
      }
    };

    return {
      inputValue,
      error,
      onInput,
      onClickRightIcon,
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
    border-radius: 3px;
    border: 1px solid #7c7a7a;
    padding: 2px 8px 2px 8px;
    background: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background-color: #fff;

    &:hover,
    &:active {
      border: 1px solid #219134;
    }

    &:focus {
      outline: none;
      border: 1px solid #219134;
    }
  }

  .h-input-item.has-right-icon {
    padding: 2px 32px 2px 8px;
  }
}

.ic-right {
  display: flex;
  background: #fff;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 1px solid #7c7a7a;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  right: 0;
}

.icon24 {
  width: 24px !important;
  height: 24px !important;
  position: relative;
}

.fa {
  padding: 4px;
}

.pointer {
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
}
</style>