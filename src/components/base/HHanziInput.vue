<template>
  <div ref="hInputComponent">
    <div class="input-container">
      <h-input
        :width="width"
        :label="label"
        :placeholder="placeholder"
        :maxLength="maxLength"
        :disabled="disabled"
        rightIcon="fa fa-regular fa-pen-to-square"
        :isClickRightIcon="true"
        @clickRightIcon="onClickRightIcon"
        v-model="inputValue"
      />
      <button class='submit-button' @click="submit">
        <i class="icon24 fa fa-right-to-bracket" />
      </button>
    </div>

    

    <teleport to="body">
      <div class="writing-board" ref="hHanziLookupComponent">
        <hanzi-lookup
          v-if="showWritingBoard"
          :boardSize="boardSize"
          v-model="hanziCharSubmit"
        >
        </hanzi-lookup>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref, watch, onMounted, reactive } from "vue";

import HanziLookup from "./HanziLookup.vue";
import HInput from "./HInput.vue";

export default {
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
  },
  name: "HHanziInput",
  components: {
    HanziLookup,
    HInput,
  },
  setup(props, { emit }) {
    const showWritingBoard = ref(false);
    const inputValue = ref(props.modelValue);
    const hInputComponent = ref(null);
    const hHanziLookupComponent = ref(null);
    const boardSize = ref(600);
    const hanziCharSubmit = ref("");

    // Watch for changes in modelValue prop to update inputValue
    watch(
      () => props.modelValue,
      (newValue) => {
        inputValue.value = newValue;
      }
    );

    watch(
      () => hanziCharSubmit.value,
      (newValue) => {
        inputValue.value = `${
          inputValue.value ? inputValue.value : ""
        }${newValue}`;
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
      showWritingBoard.value = !showWritingBoard.value;
    };

    const getPosition = () => {
      const rect = hInputComponent.value.getBoundingClientRect();
      boardSize.value = rect.width - 8;
      hHanziLookupComponent.value.style.position = "absolute";
      hHanziLookupComponent.value.style.left = `${rect.left}px`;
      hHanziLookupComponent.value.style.top = `${rect.bottom + 1}px`;
    };

    onMounted(() => {
      getPosition();
      window.addEventListener("resize", getPosition);
    });

    const submit = () => {
        emit("update:modelValue", inputValue.value);
        inputValue.value = '';
    }

    return {
      hanziCharSubmit,
      boardSize,
      hInputComponent,
      hHanziLookupComponent,
      inputValue,
      onInput,
      onClickRightIcon,
      showWritingBoard,
      submit
    };
  },
};
</script>

<style scoped>

.input-container {
    display: flex;
}

.submit-button {
    width: 28px;
    margin-left: 2px;
    cursor: pointer;
    background-color: rgba(74, 182, 74, 0.658);
    border: none;
    border-radius: 4px;
}
.writing-board {
  position: absolute;
}
</style>