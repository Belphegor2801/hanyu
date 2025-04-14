// store.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    numOfLessons: 9
  }),
  actions: {
    setGlobalVariable(value) {
      this.numOfLessons = value;
    }
  }
});