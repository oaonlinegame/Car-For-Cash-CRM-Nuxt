<template>
  <v-container>
    <h1 class="text-h4 text-primary mb-6">🧪 ห้องทดลองสมรรถภาพ (Clean Code)</h1>

    <v-row>
      <v-col cols="12">
        <v-card title="2. Dexie DB & System" border color="grey-lighten-4">
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-text-field v-model="dbInput" label="พิมพ์ชื่อทดสอบ" bg-color="white"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn block height="56" color="primary" @click="handleSave">บันทึก & Backup</v-btn>
              </v-col>
            </v-row>

            <v-table density="compact" class="mt-3">
              <thead><tr><th>ID</th><th>ชื่อ</th><th>เวลาบันทึก</th></tr></thead>
              <tbody>
                <tr v-for="item in leads" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.date }}</td>
                </tr>
              </tbody>
            </v-table>

            <v-btn block color="success" class="mt-4" prepend-icon="mdi-microsoft-excel" @click="handleExport">
              ทดสอบ Export Excel (Report)
            </v-btn>
            
            <p v-if="jsonHandle" class="text-caption text-success mt-2">
              *กำลังเชื่อมต่อกับไฟล์ Backup: {{ jsonHandle.name }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { db } from '~/db/index'

// 1. เรียกใช้ความสามารถจากไฟล์กลาง (Composables)
const { exportAsReport } = useExcelService()
const { saveJsonBackup, jsonHandle } = useFileBackup()

// 2. ตัวแปรหน้าเว็บ
const dbInput = ref('')
const leads = ref([]) 

// 3. ฟังก์ชันดึงข้อมูล (Dexie)
const fetchLeads = async () => {
  leads.value = await db.leads.orderBy('id').reverse().limit(5).toArray()
}

// 4. ฟังก์ชันกดปุ่มบันทึก (รวม Logic ทุกอย่างไว้สั้นๆ)
const handleSave = async () => {
  if (!dbInput.value) return

  // 4.1 ลง DB
  await db.leads.add({
    name: dbInput.value,
    phone: '081-TEST-LAB',
    channel: 'Lab',
    status: 'Testing',
    date: new Date().toLocaleString()
  })
  
  dbInput.value = ''
  await fetchLeads() // โหลดใหม่

  // 4.2 สั่ง Backup (เรียกใช้จาก Composable ง่ายๆ บรรทัดเดียว!)
  await saveJsonBackup(leads.value, 'Somwang_Backup.json')
}

// 5. ฟังก์ชันกดปุ่ม Export Excel
const handleExport = () => {
  // เรียกใช้จาก Composable บรรทัดเดียวจบ!
  exportAsReport(leads.value, 'Somwang_Daily_Report')
}

// Life Cycle
onMounted(() => {
  fetchLeads()
})
</script>