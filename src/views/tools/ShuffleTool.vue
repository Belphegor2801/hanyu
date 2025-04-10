<template>
  <div class="container">
    <div class="input-area">
      <textarea
        v-model="inputText"
        placeholder="Nhập văn bản ở đây..."
      ></textarea>
      
    </div>

    <div class="results">
      <button @click="sortRandomly">Sắp xếp</button>
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
      if (this.inputText.trim() == "") {
        this.sortedTexts = [];
        return;
      }
      this.sortedTexts = this.inputText
        .split("\n").filter(x => x != "")
        .sort(() => Math.random() - 0.5);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px; /* Khoảng cách giữa input và kết quả */
}

.input-area {
  flex: 1; /* Chiếm 1 phần */
}

.results {
  flex: 1; /* Chiếm 1 phần */
}

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
  background-color: rgba(16, 173, 79, 1);
  border: 1px solid rgba(16, 173, 79, 1);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #fff;
  border: 1px solid rgba(16, 173, 79, 1);
  color: rgba(16, 173, 79, 1);
}

.result-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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

/* Media Query cho màn hình nhỏ */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Chuyển sang cột */
  }

  .input-area {
    width: 100%;
  }

  .results {
    width: 100%;
  }
}
</style>