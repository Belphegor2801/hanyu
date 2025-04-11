<template>
  <div class="radicals-view">
    <!-- <button class="play-button">Quizz</button> -->

    <!-- <div class="intro">
      <strong>Bộ thủ tiếng Trung (部首)</strong> là một bộ phận để cấu tạo nên
      chữ Hán. Một chữ Hán sẽ được cấu tạo từ một hay nhiều bộ Thủ ghép lại với
      nhau. Từ bộ thủ có thể đoán được sơ lược ý nghĩa của từ, vì vậy việc học
      bộ thủ rất quan trọng.
    </div> -->

    <!-- <h2 class="grid-title">Bảng danh sách bộ thủ</h2> -->

    <div class="main-view">
      <div class="grid-view">
        <div class="table-container">
          <table>
            <tbody class="body">
              <tr v-for="key in Object.keys(gridData)" :key="key">
                <td class="sticky">
                  <div class="row-title">{{ key }}</div>
                </td>
                <td
                  v-for="(cell, colIndex) in gridData[key]"
                  :key="colIndex"
                  class="text-cell"
                  :class="[{ active: cell.id == currentActiveCell.id }]"
                  @click="onActiveCell(cell)"
                >
                  {{ cell["radical"] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tab-view">
        <div class="radical-view" v-if="currentActiveCell">
          <div class="radical-char">{{ currentActiveCell["radical"] }}</div>
        </div>
        <div class="info-view" v-if="currentActiveCell">
          <div class="info-title"></div>
          <div>
            <div class="info-row">
              <div class="info-key">Phiên âm</div>
              <div class="info-value">{{ currentActiveCell["pinyin"] }}</div>
            </div>
            <div class="info-row">
              <div class="info-key">Số nét</div>
              <div class="info-value">
                {{ currentActiveCell["strokeCount"] }}
              </div>
            </div>
            <div class="info-row">
              <div class="info-key">Tên bộ thủ</div>
              <div class="info-value">
                {{ currentActiveCell["vietnamese"] }}
              </div>
            </div>
            <div class="info-row meaning-row">
              <div class="info-key">Ý nghĩa</div>
              <div class="info-value">
                {{ currentActiveCell["translate"] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HanziLookup from "@/components/base/HanziLookup.vue";
import { ref, computed, onMounted, watch } from "vue";

import data from "@/data/radicals.json";
export default {
  name: "Radicals",
  components: {
    HanziLookup,
  },
  setup() {
    const radicals = data["data"];
    const gridData = ref({});
    const currentActiveCell = ref();

    const onActiveCell = (cell) => {
      currentActiveCell.value = cell;
    };

    const onBuildRadicalData = () => {
      radicals.forEach((item) => {
        if (!gridData.value[item.strokeCount]) {
          gridData.value[item.strokeCount] = [];
        }
        gridData.value[item.strokeCount].push(item);
      });

      currentActiveCell.value = gridData.value[1][0];
    };

    onMounted(() => {
      onBuildRadicalData();
    });

    return {
      gridData,
      currentActiveCell,
      onActiveCell,
    };
  },
};
</script>

<style lang="scss">
.radicals-view {
  .play-button {
    position: absolute;
    top: 10px;
    right: 12px;
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

  .play-button:hover {
    background-color: #fff;
    color: #6bbe6b;
    border: 1px solid #6bbe6b;
  }

  .intro {
    text-align: left;
    line-height: 22px;
  }

  .grid-title {
    margin-bottom: 8px;
    text-align: left;
    font-size: 24px;
  }

  .main-view {
    display: flex;
    gap: 8px;

    .grid-view {
      display: flex;
      flex-direction: column;
      flex-grow: 1; // Allow grid-view to expand
      min-width: 0; // Prevent overflow issues

      .text-cell {
        cursor: pointer;
      }

      .table-container {
        height: calc(42px * 17 + 7px);
        overflow: auto;
        border: 1px solid #ddd;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      .row-title {
        width: 42px;
      }

      th,
      td {
        border: 1px solid #ddd;
        height: 42px;
        text-align: center;
        min-width: 42px;
        font-size: 20px;
      }

      td:nth-child(1) {
        background-color: rgb(178, 131, 209) !important;
      }

      th {
        background-color: #5aa777;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      td.sticky {
        position: sticky;
        left: -1px;
        background-color: #fff;
        z-index: 5;
      }

      .active {
        background-color: #5aa777;
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
    }

    .tab-view {
      flex-shrink: 0; // Prevent shrinking when the grid-view expands
      width: 360px; // Set a fixed width for the tab-view
      background-color: #aeb1ae;
      padding: 10px;
      transition: width 0.3s;

      .radical-view {
        width: 340px;
        height: 340px;
        background-color: #f0f0f0;
        border-radius: 4px;
        .radical-char {
          font-size: 222px;
        }

        .radical-pinyin {
          font-size: 26px;
        }
      }

      .info-view {
        margin-top: 10px;
        .info-row {
          display: flex;
          flex-wrap: wrap;
          .info-key {
            width: 100px;
            height: 36px;
            background-color: #f0f0f0;
            text-align: left;
            padding: 8px;
            margin-top: 1px;
          }
          .info-value {
            flex-grow: 1;
            height: 36px;
            background-color: #f0f0f0;
            text-align: left;
            padding: 8px;
            margin-top: 1px;
            margin-left: 1px;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .main-view {
    flex-direction: column;

    .grid-view {
      .table-container {
        height: calc(65vh) !important;
        overflow: auto;
      }
    }
    .tab-view {
      flex-shrink: 0;
      background-color: #aeb1ae;
      padding: 10px;
      display: flex;
      width: 100% !important;
      border-radius: 4px;
      transition: width 0.3s;
      min-height: calc(35vh - 56px - 24px - 10px);
      max-height: calc(35vh - 56px - 24px - 10px);
      gap: 4px;

      .radical-view {
        max-width: 33% !important;
        height: inherit !important;
        background-color: #f0f0f0;
        border-radius: 0px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        .radical-char {
          font-size: 99px !important;
        }
      }

      .info-view {
        margin-top: -1px !important;
        width: 100%;
        display: flex;
        flex-direction: column;
        .info-row {
          display: flex;
          flex-wrap: wrap;
          .info-key {
            width: 80px !important;
            height: 27px !important;
            background-color: #f0f0f0;
            font-size: 12px !important;
            text-align: left;
            padding: 8px;
            margin-top: 1px;
          }
          .info-value {
            max-width: calc(100% - 82px);
            flex-grow: 1;
            height: 27px !important;
            font-size: 12px !important;
            background-color: #f0f0f0;
            text-align: left;
            padding: 8px;
            margin-top: 1px;
            margin-left: 1px;
          }
        }

        .info-row.meaning-row {
          .info-key {
            height: calc(35vh - 100px - 10px - 28px * 3) !important;
          }

          .info-value {
            height: calc(35vh - 100px - 10px - 28px * 3) !important;
          }
        }
      }
    }
  }
}
</style>