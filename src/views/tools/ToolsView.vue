<template>
  <div>
    <h1>Sắp xếp ngẫu nhiên</h1>
    <textarea
      v-model="inputText"
      placeholder="Nhập văn bản ở đây..."
    ></textarea>
    <button @click="sortRandomly">Sắp xếp</button>

    <div class="results" v-if="sortedTexts.length > 0">
      <h2>Kết quả:</h2>

      <div class="result-container">
        <div
          class="result-item"
          v-for="(text, index) in sortedTexts"
          :key="index"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      inputText: "",
      sortedTexts: [],
    };
  },
  methods: {
    sortRandomly() {
      this.sortedTexts = this.inputText
        .split("\n")
        .sort(() => Math.random() - 0.5);
    },
  },
};
</script>
  
  <style lang="scss" scoped>
textarea {
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  border-radius: 2px;
}

textarea:focus {
  outline: none !important;
  border: 1px solid rgba(16, 173, 79, 1);
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: rgba(16, 173, 79, 1);
  border: none;
  border-radius: 4px;
  color: #fff;
}

button:hover {
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(16, 173, 79, 1);
  color: rgba(16, 173, 79, 1);
}

.results {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.result-container {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(100px, 1fr)
  ); /* Responsive columns */
  gap: 10px; /* Space between grid items */
  width: 100%; /* Full width of the container */
  margin: auto; /* Center the grid */
  padding: 10px; /* Padding around the grid */
}
.result-item {
  background-color: #4caf50;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 5px; /* Rounded corners */
}
</style>