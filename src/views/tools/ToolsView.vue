<template>
  <div>
    <div class="tabs" v-if="!isMobile">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="['tab', { active: activeTab.name === tab.name }]"
        @click="activeTab = tab"
      >
        {{ tab.label }}
      </div>
    </div>
    <select v-else v-model="activeTab" @change="onTabChange">
      <option v-for="tab in tabs" :key="tab.name" :value="tab">
        {{ tab.label }}
      </option>
    </select>

    <div class="tab-content">
      <component :is="activeTab.component"></component>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ShuffleTool from "./ShuffleTool.vue";
import RandomLessonWords from "./RandomLessonWords.vue";

export default {
  setup() {
    const tabs = [
      {
        name: "tool1",
        label: "Từ ngữ ngẫu nhiên theo bài học",
        component: RandomLessonWords,
      },
      { name: "tool2", label: "Sắp xếp ngẫu nhiên", component: ShuffleTool },
    ];

    const activeTab = ref(tabs[0]);
    const isMobile = ref(false);

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth < 768; // Kích thước màn hình nhỏ hơn 768px
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    const onTabChange = (event) => {
      activeTab.value;
    };

    return { tabs, activeTab, isMobile, onTabChange };
  },
};
</script>

<style>
select {
  margin-top: 0px !important;
  padding-right: 10px;
  -webkit-appearance: button !important;
  -moz-appearance: button !important;
  appearance: button !important;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 6px;
  border-bottom: 1px solid #bbb7b7;
}
.tab {
  padding: 10px;
  cursor: pointer;
}
.tab.active {
  font-weight: bold;
  border-bottom: 2px solid #49af73;
}
.tab-content {
  margin-top: 20px;
}
select {
  margin-top: 10px;
  padding: 5px;
  font-size: 16px;
}
</style>