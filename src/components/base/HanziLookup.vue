<template>
  <div class="content" :style="{ width: width + 'px'}">
    <div class="drawingBoard loading">
      <span v-if="loading">Loading...</span>
    </div>
    <div class="charPicker mmahLookupChars">
      <span v-for="match in mmahMatches" :key="match.character">
        <button class="charButton" @click="submit(match.character)">{{ match.character }}</button>
      </span>
    </div>
    <div class="commands">
      <button class="cmd cmdClear" @click="clearCanvas">Clear</button>
      <button class="cmd cmdUndo" @click="undoStroke">Undo</button>
      <br />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import HanziLookup from "@/composables/hanziLookup/hanziLookup.js";

import mmah from "@/composables/hanziLookup/mmah.json";

export default {
  props: {
    modelValue: {
      default: null,
    },
    boardSize: {
      type: Number,
      default: 400,
    },
  },
  data() {
    var width = this.boardSize + 8;
    var height = this.boardSize + 8 + 100;
    return {
      width,
      height,
      loading: true,
      mmahMatches: [],
      drawingBoard: null,
      filesToLoad: 1,
    };
  },
  mounted() {
    // Init Data
    var mmahData= JSON.parse(JSON.stringify(mmah));
    this.hanziLookupInit("mmah", mmahData, this.fileLoaded);
  },
  methods: {
    /**
     * init data
     * NXHinh 20.03.2025
     */
    hanziLookupInit(a, data, callback) {
      function parseData(a, data) {
        HanziLookup.data[a] = data;
        HanziLookup.data[a].substrokes = HanziLookup.decodeCompact(
          HanziLookup.data[a].substrokes
        );
      }

      try {
        parseData(a, data);
        callback(true);
      } catch (error) {
        console.log(error);
        callback(false);
      }
    },

    /**
     * fileLoaded
     * NXHinh 20.03.2025
     */
    fileLoaded(success) {
      if (!success) {
        this.loading = false;
        $(".drawingBoard span").text("Failed to load data.");
        return;
      }
      this.filesToLoad--;
      if (this.filesToLoad !== 0) return;

      this.loading = false;
      this.drawingBoard = HanziLookup.DrawingBoard(
        $(".drawingBoard").first(),
        this.lookup,
        this.boardSize
      );
    },

    /**
     * Undo nét gần nhất
     * NXHinh 20.03.2025
     */
    undoStroke() {
      this.drawingBoard.undoStroke();
      this.drawingBoard.redraw();
      this.lookup();
    },
    /**
     * Xóa toàn bộ các nét
     * NXHinh 20.03.2025
     */
    clearCanvas() {
      this.drawingBoard.clearCanvas();
      this.drawingBoard.redraw();
      this.lookup();
    },
    /**
     * Lookup
     * NXHinh 20.03.2025
     */
    lookup() {
      const analyzedChar = new HanziLookup.AnalyzedCharacter(
        this.drawingBoard.cloneStrokes()
      );

      const mmahMatches = new HanziLookup.Matcher("mmah");
      mmahMatches.match(analyzedChar, 8, (matches) => {
        this.mmahMatches = matches;
      });
    },
    /**
     * Lookup
     * NXHinh 28.03.2025
     */
    submit(char) {
      this.clearCanvas();
      this.$emit("update:modelValue", char);
    }
  },
};
</script>

<style scoped>
.content {
  position: relative;
  color: #f0f0f0;
  border-radius: 2px;
  padding: 4px;
  background-color: #43c282;
}
.drawingBoard {
  cursor: crosshair;
  clear: both;
  overflow: hidden;
  background-color: #fafafa;
  padding: 0px;
}
.drawingBoard span {
  display: none;
}

.charPicker {
  height: 56px;
  background-color: #fafafa;
  overflow: hidden;
  color: #606060;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 4px;
  padding: 4px 0;
}
.charPicker span {
  cursor: default;
}

.charButton {
  width: 40px;
  height: 48px;
  font-size: 24px;
}

.charButton:hover {
  cursor: pointer;
  background-color: #42B883;
  border-radius: 2px;
  color: #fff;
  border: none;
}

.commands {
  margin-top: 4px;
  width: inherit;
  justify-content: center;
  align-content: center;
  display: flex;
  width: 100%;
}
.cmd {
  width: 100%;
  text-align: center;
  padding: 3px;
  color: #606060;
  border: none;
}
.cmd.cmdClear {
  float: left !important;
  margin-right: 10px;
}
.cmd.cmdUndo {
  float: right !important;
}
.cmd:hover {
  background-color: #a6c7b8;
  cursor: pointer;
}
</style>