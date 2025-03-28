<template>
  <div class="quiz-container">
    <div v-if="!isEnd" class="quiz-content">
      <div class="question-section">
        <div class="quiz-status">
          <div>
            Question {{ currentQuestionIndex + 1 }} of {{ totalQuestions }}
          </div>
          <div class="results">
            <div class="green-rec"></div>
            <p>{{ formatNumber(correctAnswers) }}</p>
            <div class="red-rec"></div>
            <p>{{ formatNumber(incorrectAnswers) }}</p>
          </div>
        </div>
        <div></div>
        <div class="question-text">
          <p>{{ currentQuestion.question }}</p>
        </div>
        <div v-if="currentQuestion.inputType == 2">
          <div
            v-if="
              currentQuestion.answerType == 1 || currentQuestion.answerType == 2
            "
            class="answer-buttons"
          >
            <button
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              @click="selectAnswer(answer)"
              :class="[{ 'ml-8': index % 2 == 1 }]"
              class="answer-button--type-1"
            >
              {{ answer }}
            </button>
          </div>
          <div v-else class="answer-buttons">
            <button
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              @click="selectAnswer(answer)"
              class="answer-button--type-2"
            >
              {{ answer }}
            </button>
          </div>
        </div>
        <div v-else-if="currentQuestion.inputType == 1">
          <HHanziInput v-model="inputValue" />
        </div>
      </div>

      <div class="previous-word">
        <h3>Kết quả câu trước</h3>
        <div class="grid-view">
          <div class="word-view">
            <div class="word-char" v-if="previousWord">
              {{ previousWord["word"] }}
            </div>
          </div>
          <div class="info-view" v-if="previousWord">
            <div class="info-title"></div>
            <table>
              <tbody>
                <tr>
                  <td class="info-key">Phiên âm</td>
                  <td class="info-value">{{ previousWord["pinyin"] }}</td>
                </tr>
                <tr>
                  <td class="info-key">Hán Việt</td>
                  <td class="info-value">
                    {{ previousWord["sino-vietnamese"] }}
                  </td>
                </tr>
                <tr>
                  <td class="info-key">Dịch nghĩa</td>
                  <td class="info-value">
                    {{ previousWord["vietnamese"] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="end-content">
      <h3>Kết quả bạn đạt được:</h3>
      <h1 class="results">
        {{ formatNumber(correctAnswers) }}/{{ formatNumber(totalQuestions) }}
      </h1>
      <button class="reset-button" @click="resetgame">Làm lại</button>
    </div>
  </div>
</template>

<script>
import data from "@/data/vocabs.json";
import HHanziInput from "@/components/base/HHanziInput.vue";
export default {
  components: {
    HHanziInput,
  },
  data() {
    return {
      currentQuestionIndex: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      previousWord: {},
      questions: [{}],
      isEnd: false,
      type: {
        1: "word",
        2: "pinyin",
        3: "vietnamese",
      },
      inputType: {
        1: "writen",
        2: "selected",
      },
      inputValue: "",
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    totalQuestions() {
      return this.questions.length;
    },
  },
  mounted() {
    this.initializeQuiz();
  },
  watch: {
    inputValue(newValue) {
      if (newValue == '') return;
      if (this.isEnd) return;
      if (newValue === this.currentQuestion.correct) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }
      this.previousWord = this.currentQuestion.word;

      if (this.currentQuestionIndex + 1 < this.totalQuestions) {
        this.currentQuestionIndex++;
      } else {
        this.isEnd = true;
      }

      this.inputValue = '';
    },
  },
  methods: {
    pickRandomNum(num) {
      return Math.floor(Math.random() * num) + 1;
    },
    pickRandomNExcluding(list, exclude, n) {
      const filteredList = list.filter((item) => item !== exclude);

      const shuffled = filteredList.sort(() => 0.5 - Math.random());

      return shuffled.slice(0, n);
    },
    formatNumber(num) {
      return num < 10 ? `0${num}` : `${num}`;
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Chọn chỉ số ngẫu nhiên
        // Hoán đổi phần tử
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    initializeQuiz() {
      this.questions = [];
      var questionsLength = data.length;
      for (let i = 0; i < 33; i++) {
        var questionType = this.pickRandomNum(3);
        var answerType = 1;
        var inputType = 1;
        if (questionType == 1) {
          inputType = 2;
        }
        else {
          inputType = this.pickRandomNum(2);
        }

        if (inputType == 1) {
          answerType = 1;
        } else {
          answerType = this.pickRandomNum(3);
        }

        while (answerType === questionType) {
          answerType = this.pickRandomNum(3);
        }
        var word = data[this.pickRandomNum(questionsLength) - 1];
        var question = word[this.type[questionType]];
        var correct = word[this.type[answerType]];

        var correctLegth = correct.length;

        if (answerType == 2) {
          correctLegth = correct.split(" ").length;
        }

        // Lấy danh sách đáp án có thể có
        var dataAnswer = data.map((x) => x[this.type[answerType]]);
        var dataAnswerFilter = dataAnswer.filter((x) =>
          answerType == 2
            ? x.split(" ").length == correctLegth
            : x.length == correctLegth
        );
        var answers = this.pickRandomNExcluding(
          answerType == 3 ? dataAnswer : dataAnswerFilter,
          correct,
          3
        );
        answers.push(correct);
        this.questions.push({
          word: word,
          question: question,
          answers: this.shuffleArray(answers.slice()),
          correct: correct,
          answerType: answerType,
          inputType: inputType,
        });
      }
    },
    selectAnswer(answer) {
      if (this.isEnd) return;
      if (answer === this.currentQuestion.correct) {
        this.correctAnswers++;
      } else {
        this.incorrectAnswers++;
      }
      this.previousWord = this.currentQuestion.word;

      if (this.currentQuestionIndex + 1 < this.totalQuestions) {
        this.currentQuestionIndex++;
      } else {
        this.isEnd = true;
      }
    },
    resetgame() {
      this.isEnd = false;
      this.correctAnswers = 0;
      this.incorrectAnswers = 0;
      this.currentQuestionIndex = 0;
      this.initializeQuiz();
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.previousWord = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.quiz-container {
  padding: 20px;
  max-width: 800px; /* Increased width for better layout */
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #bdb6b6;
}

.quiz-content {
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Space between question and previous answers */
}

.end-content {
  display: flex;
  align-items: left;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  height: 307px;

  .results {
    font-size: 88px;
  }

  .reset-button {
    width: 100px;
    cursor: pointer;
    border-radius: 4px;
    background-color: #6bbe6b;
    color: #fff;
    height: 34px;
    font-size: 18px;
    font-weight: bold;
    border: none;
  }

  .reset-button:hover {
    background-color: #fff;
    color: #6bbe6b;
    border: 1px solid #6bbe6b;
  }
}

.question-section {
  flex: 1; /* Take available space */
  margin-right: 20px; /* Space between question and answers */

  .quiz-status {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }

  .results {
    display: flex;
    gap: 10px;
    float: right;

    .green-rec {
      width: 20px;
      height: 20px;
      background-color: #0f0;
    }

    .red-rec {
      width: 20px;
      height: 20px;
      background-color: #f00;
    }
  }

  .question-text {
    font-size: 40px;
    font-weight: 520;
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.answer-buttons {
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap */
}

.ml-8 {
  margin-left: 2% !important;
}

.answer-button--type-1 {
  flex: 0 0 49%; /* Each button takes 48% of the row, adjust as needed */
  margin: 0%; /* Small margin for spacing */
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  height: 84px;
  margin-top: 4px;
  font-size: 24px;
}

.answer-button--type-2 {
  flex: 0 0 100%; /* Each button takes 48% of the row, adjust as needed */
  margin: 0%; /* Small margin for spacing */
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  height: 40px;
  margin-top: 4px;
}

.answer-button--type-1,
.answer-button--type-2 {
  background-color: #45a049;
}

.previous-word {
  flex-shrink: 0; // Prevent shrinking when the grid-view expands
  background-color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  min-width: 300px;

  .word-view {
    margin-top: 8px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border-radius: 4px;
    .word-char {
      font-size: 88px;
    }

    .word-pinyin {
      font-size: 26px;
    }
  }

  .info-view {
    margin-top: 10px;
    width: 100%;

    .info-key {
      min-width: 140px;
      height: 36px;
      background-color: #f0f0f0;
      text-align: left;
      padding: 8px;
    }

    .info-value {
      width: 100%;
      height: 36px;
      background-color: #f0f0f0;
      text-align: left;
      padding: 8px;
    }
  }
}

/* Media Queries for smaller screens */
@media (max-width: 738px) {
  .quiz-content {
    flex-direction: column; /* Switch to vertical layout */
  }

  .question-section {
    margin-right: 0; /* Remove right margin */
  }

  .question-text {
    font-size: 28px; /* Adjust font size for smaller screens */
  }

  .previous-word {
    margin-top: 12px;
    width: 100%; /* Full width for smaller screens */
    font-size: 12px !important;

    .info-view {
      .info-key {
        min-width: 88px !important;
      }
    }
  }
}
</style>