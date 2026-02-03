// app/stores/testStore.ts
import { defineStore } from "pinia";

export const useTestStore = defineStore("test", {
  state: () => ({
    counter: 0, // ตัวแปรสำหรับนับเลข
  }),
  actions: {
    increment() {
      this.counter++;
    },
  },
});
