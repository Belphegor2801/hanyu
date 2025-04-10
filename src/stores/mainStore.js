// store.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    numOfLessons: 8
  }),
  actions: {
    setGlobalVariable(value) {
      this.numOfLessons = value;
    }
  }
});