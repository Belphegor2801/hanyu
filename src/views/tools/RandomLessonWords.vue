<template>
  <div class="container">
    <div class="controls">
      <select class="pointer" v-model="selectedMode" @change="onModeChange">
        <option class="pointer" value="single">Từng bài</option>
        <option class="pointer" value="all">Tất cả các bài</option>
      </select>

      <select
        class="pointer"
        v-model="selectedLesson"
        v-if="selectedMode == 'single'"
      >
        <option
          class="pointer"
          v-for="lesson in lessons"
          :key="lesson.id"
          :value="lesson.name"
        >
          {{ lesson.name }}
        </option>
      </select>
    </div>
    <div class="controls flex-center">
      <button class="w-160" @click="printResults">Sắp xếp</button>
    </div>

    <div class="results" v-if="results.length > 0">
      <div class="result-container">
        <div class="result-item" v-for="(text, index) in results" :key="index">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonFn from "@/commons/commonFunction";
import { useMainStore } from "@/stores/mainStore.js";

export default {
  data() {
    return {
      selectedMode: "all",
      selectedLesson: "",
      lessons: [],
      results: [],
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
    onModeChange() {},
    async printResults() {
      const store = useMainStore();
      if (this.isAllMode) {
        var jsonData = await commonFn.importJSONFiles(store.numOfLessons);
        this.results = jsonData.map((x) => x["pinyin"]).sort(() => Math.random() - 0.5);
      } else {
        var lesson = this.lessons.find((x) => x.name === this.selectedLesson);
        if (lesson != null) {
          var jsonData = await commonFn.importJSONFiles(
            store.numOfLessons,
            lesson["id"]
          );
          this.results = jsonData.map((x) => x["pinyin"]).sort(() => Math.random() - 0.5);
        }
      }
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
  margin-bottom: 20px;
}

select {
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

button {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: 1px solid #4caf50;
  border-radius: 4px;
}

button:hover {
  background-color: #fff;
  color: #4caf50;
  border: 1px solid #4caf50;
}

.results {
  margin-top: 20px;
}

.result-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  width: 100%;
  margin: auto;
  padding: 10px;
}

.result-item {
  background-color: #fcfcfc;
  border: 1px solid #111;
  color: rgb(0, 0, 0);
  padding: 10px;
  text-align: center;
  border-radius: 4px;
}
</style>