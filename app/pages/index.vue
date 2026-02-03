<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6 mt-5" elevation="3">
          <v-card-title class="text-h5 font-weight-bold d-flex align-center">
            <v-icon icon="mdi-account-group" class="mr-2" color="primary"></v-icon>
            ระบบบันทึก Lead ลูกค้า - สาขาสิงห์บุรี
          </v-card-title>
          
          <v-divider class="my-4"></v-divider>

          <v-card-text>
            <div class="mb-6">
              <div class="text-subtitle-1 mb-2 font-weight-bold">
                <v-icon icon="mdi-palette-outline" size="small" class="mr-1"></v-icon>
                เลือกโทนสีการใช้งาน (Theme)
              </div>
              
              <v-btn-toggle
                v-model="theme.global.name.value"
                mandatory
                color="primary"
                variant="outlined"
                class="d-flex flex-wrap h-auto"
                style="gap: 8px; border: none;"
              >
                <v-btn value="light" prepend-icon="mdi-weather-sunny">สว่าง</v-btn>
                <v-btn value="sepia" prepend-icon="mdi-book-open-variant">ถนอมสายตา</v-btn>
                <v-btn value="dark" prepend-icon="mdi-weather-night">มืด</v-btn>
                <v-btn value="midnight" prepend-icon="mdi-star-moon-rocket">เที่ยงคืน</v-btn>
                <v-btn value="forest" prepend-icon="mdi-tree">ป่าไม้</v-btn>
                <v-btn value="cyber" prepend-icon="mdi-palette">ไซเบอร์</v-btn>
              </v-btn-toggle>
            </div>

            <v-alert
              border="start"
              colored-border
              color="primary"
              elevation="1"
              class="mb-6"
            >
              ยินดีต้อนรับคุณอ้อ! ขณะนี้ระบบพร้อมใช้งานบนโหมด <strong>{{ theme.global.name.value.toUpperCase() }}</strong>
            </v-alert>
            
            <div class="d-flex flex-wrap gap-3">
              <v-btn size="large" color="primary" to="/test-lab" prepend-icon="mdi-flask" elevation="2">
                ไปหน้าทดสอบสมรรถภาพ
              </v-btn>
              
              <v-btn size="large" color="success" variant="tonal" prepend-icon="mdi-check-circle">
                สถานะระบบ: ปกติ
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

// ไม่ต้องมีฟังก์ชัน cycleTheme แล้ว เพราะ v-model ผูกกับชื่อธีมโดยตรงครับ
</script>

<style scoped>
.gap-3 {
  display: flex;
  gap: 16px;
}

/* ปรับแต่งให้ปุ่ม Toggle ดูทันสมัยขึ้น */
.v-btn-toggle .v-btn {
  border-radius: 8px !important;
  border: 1px solid currentColor !important;
  margin-bottom: 4px;
}
</style>