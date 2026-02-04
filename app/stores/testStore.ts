import { defineStore } from "pinia";

export const useTestStore = defineStore("testStore", {
  state: () => ({
    testStatus: "พร้อมใช้งาน" as string,
  }),
  actions: {
    // ลบ function increment() หรือ counter ทิ้งถ้ามี
    setTestStatus(val: string) {
      this.testStatus = val;
    },
  },
});
