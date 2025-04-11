<template>
  <div class="container">
    <div class="controls">
      <select class="pointer" v-model="selectedLesson" @change="fetchData">
        <option value="all">Tất cả các bài</option>
        <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.name">
          {{ lesson.name }}
        </option>
      </select>
      <input
        type="text"
        class="search-input"
        placeholder="Tìm kiếm..."
        v-model="searchQuery"
        @input="debouncedSearch"
      />
    </div>

    <div class="table-container" v-if="filteredWords.length > 0">
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Từ</th>
              <th>Pinyin</th>
              <th>Hán Việt</th>
              <th>Dịch nghĩa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(word, index) in filteredWords" :key="index">
              <td>{{ word["word"] }}</td>
              <td>{{ word["pinyin"] }}</td>
              <td>{{ word["sino-vietnamese"] }}</td>
              <td>{{ word["vietnamese"] }}</td>
            </tr>
          </tbody>
        </table>
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
      selectedLesson: "Bài 1",
      lessons: [],
      words: [],
      searchQuery: "",
      filteredWords: [],
      debounceTimeout: null,
    };
  },
  async mounted() {
    const store = useMainStore();
    for (let i = 1; i <= store.numOfLessons; i++) {
      this.lessons.push({
        id: i,
        name: `Bài ${i}`,
      });
    }
    this.selectedLesson = "Bài 1";
    this.words = await commonFn.importJSONFiles(store.numOfLessons, 1);
    this.filteredWords = this.words; // Initialize filteredWords
  },
  methods: {
    async fetchData() {
      const store = useMainStore();
      if (this.selectedLesson == "all") {
        this.words = await commonFn.importJSONFiles(store.numOfLessons);
      } else {
        const lesson = this.lessons.find((x) => x.name === this.selectedLesson);
        if (lesson != null) {
          this.words = await commonFn.importJSONFiles(
            store.numOfLessons,
            lesson["id"]
          );
        }
      }
      this.filteredWords = this.words; // Reset filtered words
    },
    debounce(func, delay) {
      return (...args) => {
        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    filterWords() {
      const query = this.searchQuery.toLowerCase();
      this.filteredWords = this.words.filter(
        (word) =>
          word.word.toLowerCase().includes(query) ||
          word.pinyin.toLowerCase().includes(query) ||
          word["sino-vietnamese"].toLowerCase().includes(query) ||
          word.vietnamese.toLowerCase().includes(query)
      );
    },
    debouncedSearch: null,
  },
  created() {
    this.debouncedSearch = this.debounce(this.filterWords, 300);
  },
};
</script>
<style scoped>
.container {
  margin: auto;
  padding: 4px;
}

.controls {
  max-width: 160px;
  margin-bottom: 10px;
}

.pointer {
  cursor: pointer;
  width: 100%;
  padding: 10px;
}

.table-container {
  border-radius: 1px;
}

.table-scroll {
  max-height: calc(100vh - 200px);
  overflow-y: auto; /* Cho phép cuộn dọc */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  width: 25%;
}

td:nth-child(1) {
  font-size: 28px;
  font-weight: 400;
}

/* Màu sắc cho tiêu đề */
th {
  background-color: #4caf50; /* Màu nền tiêu đề */
  color: white; /* Màu chữ tiêu đề */
  position: sticky; /* Cố định vị trí */
  top: -1px; /* Đặt vị trí cố định ở trên cùng */
  z-index: 1; /* Đảm bảo tiêu đề nằm trên các hàng khác */
}

/* Màu sắc cho các hàng */
tr:nth-child(even) {
  background-color: #f2f2f2; /* Màu nền cho hàng chẵn */
}

tr:hover {
  background-color: #ddd; /* Màu nền khi rê chuột */
}

/* For Webkit browsers */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .controls {
    max-width: 100%;
    width: 100%;
    margin-bottom: 10px;
  }
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.search-input:focus {
  outline: none;
  border: 1px solid #4caf50;
}
</style>