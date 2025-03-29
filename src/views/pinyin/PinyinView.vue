<template>
  <div class="pinyin">
    <div class="grid-view" :class="{ collapsed: isCollapsed }">
      <div class="toolbar">
        <div class="tab-button">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="onSelectTab(tab)"
            :class="[{ active: tab === selectedTab }]"
          >
            {{ tab["key"] }}
          </button>
        </div>

        <div class="collapse-button">
          <button @click="toggleCollapse" class="collapse-button">
            <i class="icon-24 fas fa-align-justify scale-1_1"></i>
          </button>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="sticky"></th>
              <!-- Empty corner cell -->
              <th v-for="column in grid.columns" :key="column" class="sticky">
                <div class="col">{{ column }}</div>
              </th>
            </tr>
          </thead>
          <tbody class="body">
            <tr v-for="(row, rowIndex) in grid.rows" :key="row">
              <td class="sticky">
                <div class="row">{{ row }}</div>
              </td>
              <td
                v-for="(cell, colIndex) in gridData[rowIndex]"
                :key="colIndex"
                :class="[
                  { 'text-cell': cell },
                  {
                    active:
                      rowIndex == currentActiveChar.r &&
                      colIndex == currentActiveChar.c,
                  },
                ]"
                @click="onActiveChar(rowIndex, colIndex)"
              >
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tab-view" :class="{ collapsed: isCollapsed }">
      <div class="main-text-view">
        <div class="text" @click="onPlayPinyinAudio">
          {{ gridData[currentActiveChar.r][currentActiveChar.c] }}
        </div>
        <div class="sub-text" v-if="grid.columns[currentActiveChar.c] != ' '">
          {{ grid.columns[currentActiveChar.c] }} +
          {{ final_chars[selectedTab["mapping"]][currentActiveChar.r] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import data from "@/data/pinyin.json";

export default {
  setup() {
    const tabs = ref(data["tones"]);
    const selectedTab = ref(tabs.value[0]);

    const final_chars = data["final_chars"];
    const grid = ref({
      columns: data["initial_chars"],
      rows: final_chars["0"],
    });

    const currentActiveChar = ref({ r: 0, c: 0 });
    const gridData = computed(() => {
      return data["data"][selectedTab.value["key"]] || [];
    });

    const checkExist = (rowIndex, colIndex) => {
      return gridData.value[rowIndex][colIndex] != " ";
    };

    const onFocusFirstChar = () => {
      for (var i in gridData.value) {
        for (var j in gridData.value[i]) {
          if (gridData.value[i][j] != " ") {
            currentActiveChar.value.r = i;
            currentActiveChar.value.c = j;
            return;
          }
        }
      }
    };

    const onSelectTab = (tab) => {
      selectedTab.value = tab;
    };

    const onActiveChar = (rowIndex, colIndex) => {
      if (gridData.value[rowIndex][colIndex] != " ") {
        currentActiveChar.value.r = rowIndex;
        currentActiveChar.value.c = colIndex;
      }
    };

    const isCollapsed = ref(true);

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const audioSrc = computed(() => {
      var _i =
        grid.value.columns[currentActiveChar.value.c] != " "
          ? grid.value.columns[currentActiveChar.value.c]
          : "";
      const filename = `${_i}${grid.value.rows[currentActiveChar.value.r]}${
        selectedTab.value["mapping"]
      }.mp3`;
      return `assets/audio/${filename}?raw=true`; // Use require for static paths
    });

    const audio = new Audio();
    const onPlayPinyinAudio = () => {
      audio.src = audioSrc.value; 
      audio.load();
      try {
        audio.currentTime = 0; // Reset to the start
        audio.play();
      } catch (error) {
        console.error("Error playing audio:", audioSrc.value);
      }
    };

    onMounted(() => {
      onFocusFirstChar();
    });

    watch(selectedTab, (newTab) => {
      if (!checkExist(currentActiveChar.value.r, currentActiveChar.value.c)) {
        onFocusFirstChar();
      }
    });

    return {
      tabs,
      final_chars,
      selectedTab,
      grid,
      gridData,
      currentActiveChar,
      isCollapsed,
      toggleCollapse,
      onSelectTab,
      onActiveChar,
      audioSrc,
      onPlayPinyinAudio,
    };
  },
};
</script>

<style lang="scss">
.pinyin {
  position: relative;
  display: flex;
  gap: 8px;

  .grid-view {
    display: flex;
    flex-direction: column;
    flex-grow: 1; // Allow grid-view to expand
    min-width: 0; // Prevent overflow issues
    border: none;
    height: calc(100vh - 56px - 12px - 12px) !important;

    .toolbar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;

      .tab-button {
        display: flex;
        gap: 4px;

        button {
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 32px;
          padding-top: 5.6px;
          color: #6bbe6b;
          border: 1px solid #6bbe6b;
        }

        button:hover {
          cursor: pointer;
          background-color: #6bbe6b;
          color: #fff;
        }

        button:active,
        button.active {
          background-color: #6bbe6b;
          color: #fff;
        }
      }
    }

    .table-container {
      height: calc(100%);
      overflow: auto;
      border: 1px solid #ddd;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      border: 1px solid #ddd;
      height: 32px;
      text-align: center;
      min-width: 60px;
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
      left: 0;
      background-color: #fff;
      z-index: 5;
    }

    .text-cell:hover {
      cursor: pointer;
      background-color: #5aa777;
    }

    .text-cell.active {
      background-color: #79b679;
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

  .collapse-button {
    background-color: #6bbe6b;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
  }

  .tab-view {
    flex-shrink: 0; // Prevent shrinking when the grid-view expands
    width: 340px; // Set a fixed width for the tab-view
    background-color: #aeb1ae;
    padding: 10px;
    transition: width 0.3s;

    &.collapsed {
      width: 0px; // Adjust width when collapsed
      overflow: hidden; // Hide overflow when collapsed
      display: none;
    }

    .main-text-view {
      margin-top: 32px;
      width: 100%; // Use full width of the tab-view
      height: 300px;
      border-radius: 4px;
      background-color: rgb(255, 255, 255);
      font-size: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .text {
        height: 140px;
        margin-top: -30px;
        cursor: pointer;
      }

      .sub-text {
        height: 13px;
        font-size: 32px;
      }
    }
  }
}

@media (max-width: 768px) {
  .pinyin {
    position: relative;
    flex-direction: column;
    .grid-view.collapsed {
      max-height: calc(100vh - 80px);
      position: relative;
      .table-container {
        overflow: auto;
      }
    }

    .grid-view {
      position: relative;
      max-height: 65vh;
      .table-container {
        overflow: auto;
      }
    }

    .tab-view {
      flex-shrink: 0; // Prevent shrinking when the grid-view expands
      width: 100%; // Set a fixed width for the tab-view
      background-color: #aeb1ae;
      padding: 10px;
      transition: width 0.3s;
      border-radius: 4px;
      height: calc(30vh - 24px - 12px);

      &.collapsed {
        width: 0px; // Adjust width when collapsed
        overflow: hidden; // Hide overflow when collapsed
        display: none;
      }

      .main-text-view {
        margin-top: 0;
        width: 100%; // Use full width of the tab-view
        height: 100%;

        .text {
          margin-top: -8px;
          font-size: 52px !important;
          height: 50px !important;
          cursor: pointer;
        }

        .sub-text {
          margin-top: 30px !important;
          height: 13px;
          font-size: 16px !important;
        }
      }
    }
  }
}
</style>