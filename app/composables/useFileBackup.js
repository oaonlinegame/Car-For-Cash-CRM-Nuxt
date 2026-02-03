export const useFileBackup = () => {
  // ใช้ useState เพื่อจำค่า fileHandle ไว้ (แม้จะเปลี่ยน Component ไปมาในหน้าเดิม)
  const jsonHandle = useState("jsonHandle", () => null);

  const saveJsonBackup = async (data, suggestedName = "backup.json") => {
    // แปลงข้อมูลเป็น Text
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    // ตรวจสอบว่า Browser รองรับไหม
    if ("showSaveFilePicker" in window) {
      try {
        // ถ้ายังไม่เคยเลือกไฟล์ ให้เด้งถาม
        if (!jsonHandle.value) {
          jsonHandle.value = await window.showSaveFilePicker({
            suggestedName: suggestedName,
            types: [
              {
                description: "JSON Database",
                accept: { "application/json": [".json"] },
              },
            ],
          });
        }

        // เขียนทับไฟล์เดิม (หรือไฟล์ที่เพิ่งเลือก)
        const writable = await jsonHandle.value.createWritable();
        await writable.write(blob);
        await writable.close();

        console.log("✅ Auto-Backup JSON Success!");
        return true; // บอกว่าสำเร็จ
      } catch (err) {
        console.error("Backup Failed:", err);
        // ถ้า Error แปลว่าไฟล์อาจหาย หรือ User กดยกเลิก -> เคลียร์ค่าทิ้ง
        if (err.name !== "AbortError") jsonHandle.value = null;
        return false;
      }
    } else {
      console.warn("Browser นี้ไม่รองรับ File System Access API");
      return false;
    }
  };

  return {
    saveJsonBackup,
    jsonHandle, // ส่งตัวแปรออกไปเผื่ออยากเช็คสถานะ
  };
};
