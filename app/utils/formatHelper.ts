// app/utils/formatHelper.ts
export const formatTime = (date: Date) => {
  // แปลงเวลาเป็นภาษาไทย เช่น 14:30:45
  return date.toLocaleTimeString("th-TH");
};
