import * as XLSX from "xlsx";

export const useExcelService = () => {
  // ฟังก์ชัน Export ข้อมูลเป็น Excel (แบบดาวน์โหลดใหม่ทุกครั้ง)
  const exportAsReport = (data, fileNamePrefix = "Report") => {
    try {
      // 1. แปลง JSON -> Sheet
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // 2. ตั้งชื่อไฟล์ (แปะวันที่ให้ด้วย)
      const dateStr = new Date().toISOString().slice(0, 10);
      const finalName = `${fileNamePrefix}_${dateStr}.xlsx`;

      // 3. สั่งดาวน์โหลด
      XLSX.writeFile(wb, finalName);
      console.log("Export Excel Success:", finalName);
    } catch (e) {
      console.error("Export Excel Failed:", e);
      alert("เกิดข้อผิดพลาดในการ Export Excel");
    }
  };

  return {
    exportAsReport,
  };
};
