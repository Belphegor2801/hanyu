<template>
  <div class="h-input" :style="{ width: width !== 0 ? width + 'px' : '100%' }">
    <label v-if="label">{{ label }}</label>
    <input
      ref="input"
      type="text"
      class="h-input-item"
      :class="[{ 'has-right-icon': rightIcon, 'input-error': isError }]"
      v-model="inputValue"
      @input="onInput"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxLength"
      :style="{ height: height + 'px', 'font-size': fontSize + 'px' }"
    />

    <div v-if="rightIcon" class="ic-right">
      <div
        :class="['rightIcon', isClickRightIcon ? 'pointer' : '', {'input-error': isError}]"
        @click="onClickRightIcon"
        :style="{
          height: height - 2 + 'px !important',
          width: height - 2 + 'px',
          'font-size': `${height < 40 ? 14 : 32}px`,
        }"
        v-tooltip="'Click me for more info!'"
      >
        <div :class="rightIcon"></div>
      </div>
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
    height: {
      type: Number,
      default: 26,
    },
    fontSize: {
      type: Number,
      default: 14,
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
    },
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue); // Create a reactive reference for the input value
    const isError = ref(false);
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
        isError.value = true;
        error.value = ""; // Example error message
      } else {
        isError.value = false;
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
      isError,
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

.input-error {
  border: 1px solid rgb(209, 31, 31) !important;
}

input::placeholder {
  font-style: italic;
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

.rightIcon {
  display: flex;
  align-items: center;
  justify-content: center;
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