<template>
  <div class="container">
    <div class="controls">
      <select class="pointer" v-model="selectedLesson">
        <option class="pointer" value="all">Tất cả các bài</option>
         <option
          class="pointer"
          v-for="lesson in lessons"
          :key="lesson.id"
          :value="lesson.name"
        >
          {{ lesson.name }}
        </option>
      </select>

      <button class="arrange-button w-160" @click="printResults">
        Sắp xếp
      </button>
    </div>

    <div class="results" v-if="results.length > 0">
      <div class="result-container">
        <button
          class="result-item"
          :id="item['word']"
          v-for="(item, index) in results"
          :key="index"
          @mouseover="showTooltip($event, item)"
          @mouseleave="hideTooltip"
          @dblclick="showTooltip($event, item, 'word')"
        >
          <p v-html="item.pinyin"></p>
        </button>
      </div>
    </div>
    <teleport to="body">
      <div v-if="tooltipVisible" class="tooltip" :style="tooltipStyle">
        <p class='vietnamese-tooltip' v-if="isVietnameseTooltip">{{ tooltipContent }}</p>
        <p class='hanyu-tooltip' v-else>{{ tooltipContent }}</p>
      </div>
    </teleport>
  </div>
</template>

<script>
import commonFn from "@/commons/commonFunction";
import { useMainStore } from "@/stores/mainStore.js";

export default {
  data() {
    return {
      selectedLesson: "all",
      lessons: [],
      results: [],
      tooltipVisible: false,
      tooltipContent: "",
      tooltipStyle: {
        left: "0px",
        top: "0px",
      },
      isVietnameseTooltip: true,
    };
  },
  computed: {
    isAllMode() {
      return this.selectedMode === "all";
    },
    filteredLessons() {
      return this.isAllMode
        ? this.lessons
        : this.lessons.filter((lesson) => lesson.name === this.selectedLesson);
    },
  },
  async mounted() {
    const store = useMainStore();
    for (var i = 1; i <= store.numOfLessons; i++) {
      this.lessons.push({
        id: i,
        name: `Bài ${i}`,
      });
    }
    this.selectedLesson = "Bài 1";
  },
  methods: {
    async printResults() {
      const store = useMainStore();
      if (this.selectedLesson == "all") {
        var jsonData = await commonFn.importJSONFiles(store.numOfLessons);
        this.results = jsonData.map((x) => x).sort(() => Math.random() - 0.5);
      } else {
        var lesson = this.lessons.find((x) => x.name === this.selectedLesson);
        if (lesson != null) {
          var jsonData = await commonFn.importJSONFiles(
            store.numOfLessons,
            lesson["id"]
          );
          this.results = jsonData.map((x) => x).sort(() => Math.random() - 0.5);
        }
      }
    },
    showTooltip(event, item, type = "vietnamese") {
      if (type == "vietnamese") {
        this.isVietnameseTooltip = true;
        this.tooltipContent = item.vietnamese;
      } else {
        this.isVietnameseTooltip = false;
        this.tooltipContent = item.word;
      }
      this.tooltipVisible = true;

      const itemRect = event.currentTarget.getBoundingClientRect();
      this.tooltipStyle = {
        left: `${itemRect.left + itemRect.width / 2 - 60 + window.scrollX}px`, // Adjust for scrolling
        top: `${itemRect.top + window.scrollY - 22}px`, // Position above the item
      };
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
  },
};
</script>

<style scoped>
.container {
  margin: auto;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
}

select {
  min-width: 200px;
  height: 40px;
  margin-top: 0px !important;
  -webkit-appearance: button !important;
  -moz-appearance: button !important;
  appearance: button !important;
  padding-right: 10px;
}

.pointer {
  cursor: pointer;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.w-160 {
  width: 160px;
}

.arrange-button {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
  border-radius: 4px;
}

.arrange-button:hover {
  background-color: #fff;
  color: #4caf50;
  border: 1px solid #4caf50;
}

.results {
  border-radius: 4px;
  margin-top: 10px;
  max-height: calc(100vh - 194px); /* Set a max height for the results */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #ccc; /* Optional: Add a border for better visibility */
  padding: 10px; /* Optional: Add padding */
}

.result-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  width: 100%;
}

.result-item {
  position: relative;
  background-color: #fcfcfc;
  border: 1px solid #111;
  color: rgb(0, 0, 0);
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
}

.tooltip {
  position: fixed; /* Use fixed positioning */
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  text-align: center;
  border-radius: 4px;
  width: 120px;
  z-index: 1000;
  visibility: visible; /* Always visible when shown */
  opacity: 1; /* Always fully opaque when shown */
  transition: opacity 0.3s;
}

.vietnamese-tooltip {
  padding: 6px;
}

.hanyu-tooltip {
  font-size: 20px;
  padding: 2px;
}

.result-item:hover .tooltip,
.result-item:focus .tooltip,
.result-item:active .tooltip {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 768px) {
  .controls {
    max-width: 100%;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>