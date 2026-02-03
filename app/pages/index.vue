<template>
  <div>
    <v-row class="mb-4 align-center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold text-primary mb-1">Dashboard</h1>
        <div class="text-subtitle-1 text-medium-emphasis">
          สวัสดีตอนเช้า, คุณสมชาย 👋 วันนี้มีงานรอติดตาม <span class="text-primary font-weight-bold">{{ stats.pendingLeads }} รายการ</span>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="text-md-right">
        <v-btn color="primary" prepend-icon="mdi-plus" elevation="2" to="/test-lab" size="large" rounded="pill">
          เพิ่มลูกค้าใหม่
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" class="rounded-xl h-100 position-relative overflow-hidden">
          <div class="absolute-bg bg-primary opacity-10"></div>
          <v-card-text>
            <div class="d-flex justify-space-between mb-4">
              <v-avatar color="primary" variant="flat" rounded="lg">
                <v-icon color="white">mdi-account-multiple</v-icon>
              </v-avatar>
              <v-chip color="success" size="x-small" label>+12% เดือนนี้</v-chip>
            </div>
            <div class="text-h4 font-weight-bold mb-1">{{ stats.totalLeads }}</div>
            <div class="text-caption text-medium-emphasis">ลูกค้าทั้งหมดในระบบ</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" class="rounded-xl h-100 position-relative overflow-hidden">
          <div class="absolute-bg bg-info opacity-10"></div>
          <v-card-text>
            <div class="d-flex justify-space-between mb-4">
              <v-avatar color="info" variant="flat" rounded="lg">
                <v-icon color="white">mdi-calendar-today</v-icon>
              </v-avatar>
              <span class="text-caption text-info font-weight-bold">Live</span>
            </div>
            <div class="text-h4 font-weight-bold mb-1">{{ stats.todayLeads }}</div>
            <div class="text-caption text-medium-emphasis">ลูกค้าใหม่วันนี้</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" class="rounded-xl h-100">
          <v-card-text>
             <div class="d-flex justify-space-between mb-2">
              <v-avatar color="success" variant="flat" rounded="lg">
                <v-icon color="white">mdi-trophy-variant</v-icon>
              </v-avatar>
               <div class="text-right">
                <div class="text-h5 font-weight-bold text-success">{{ stats.wonLeads }}</div>
                <div class="text-caption">ปิดการขาย</div>
               </div>
            </div>
            <div class="mt-4">
              <div class="d-flex justify-space-between text-caption mb-1">
                <span>เป้าเดือนนี้ (100)</span>
                <span>{{ Math.min(Math.round((stats.wonLeads/100)*100), 100) }}%</span>
              </div>
              <v-progress-linear
                :model-value="(stats.wonLeads/100)*100"
                color="success"
                height="6"
                rounded
                striped
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

       <v-col cols="12" sm="6" md="3">
        <v-card elevation="2" class="rounded-xl h-100 border-warning" variant="outlined">
          <v-card-text>
            <div class="d-flex align-center">
              <v-avatar color="warning" variant="tonal" rounded="lg" class="mr-3">
                <v-icon>mdi-phone-ring</v-icon>
              </v-avatar>
              <div>
                <div class="text-h5 font-weight-bold">{{ stats.pendingLeads }}</div>
                <div class="text-caption text-medium-emphasis">รอติดตามผล</div>
              </div>
            </div>
            <v-divider class="my-3"></v-divider>
            <v-btn block variant="text" size="small" color="warning" to="/test-lab">
              ดูรายการทั้งหมด <v-icon end icon="mdi-chevron-right"></v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="8">
        <v-card elevation="2" class="rounded-xl pa-2">
          <v-card-title class="d-flex align-center font-weight-bold">
            <v-icon start color="primary">mdi-timeline-text-outline</v-icon>
            ความเคลื่อนไหวล่าสุด
            <v-spacer></v-spacer>
            <v-btn icon="mdi-refresh" variant="text" size="small" @click="fetchDashboardData"></v-btn>
          </v-card-title>
          
          <v-card-text>
             <div v-if="recentLeads.length === 0" class="text-center py-10 text-medium-emphasis">
                <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-sleep</v-icon>
                <p>ยังไม่มีข้อมูลความเคลื่อนไหว</p>
             </div>

             <v-timeline density="compact" align="start" v-else>
               <v-timeline-item
                  v-for="lead in recentLeads"
                  :key="lead.id"
                  :dot-color="getStatusColor(lead.status)"
                  size="x-small"
               >
                 <div class="mb-4">
                   <div class="font-weight-bold">
                     {{ lead.name }}
                     <v-chip size="x-small" :color="getStatusColor(lead.status)" variant="tonal" class="ml-2">
                       {{ lead.status }}
                     </v-chip>
                   </div>
                   <div class="text-caption text-medium-emphasis">
                     {{ formatTime(new Date(lead.createdAt)) }} - เบอร์โทร: {{ lead.phone }}
                   </div>
                 </div>
               </v-timeline-item>
             </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="rounded-xl mb-4">
           <v-card-title class="font-weight-bold text-subtitle-1">เครื่องมือด่วน</v-card-title>
           <v-card-text>
             <v-row dense>
               <v-col cols="6">
                 <v-card variant="tonal" color="primary" class="text-center py-4 rounded-lg cursor-pointer" link to="/test-lab">
                   <v-icon size="large" class="mb-2">mdi-account-plus</v-icon>
                   <div class="text-caption font-weight-bold">เพิ่มลูกค้า</div>
                 </v-card>
               </v-col>
               <v-col cols="6">
                 <v-card variant="tonal" color="info" class="text-center py-4 rounded-lg cursor-pointer" link>
                   <v-icon size="large" class="mb-2">mdi-calculator</v-icon>
                   <div class="text-caption font-weight-bold">คำนวณ</div>
                 </v-card>
               </v-col>
               <v-col cols="6">
                 <v-card variant="tonal" color="success" class="text-center py-4 rounded-lg cursor-pointer" link>
                   <v-icon size="large" class="mb-2">mdi-file-document-check</v-icon>
                   <div class="text-caption font-weight-bold">อนุมัติ</div>
                 </v-card>
               </v-col>
               <v-col cols="6">
                 <v-card variant="tonal" color="warning" class="text-center py-4 rounded-lg cursor-pointer" link>
                   <v-icon size="large" class="mb-2">mdi-printer</v-icon>
                   <div class="text-caption font-weight-bold">รายงาน</div>
                 </v-card>
               </v-col>
             </v-row>
           </v-card-text>
        </v-card>

        <v-sheet class="bg-surface-variant rounded-xl pa-4">
          <div class="d-flex align-center mb-2">
            <v-icon color="success" size="small" class="mr-2">mdi-wifi</v-icon>
            <span class="text-caption font-weight-bold">ระบบทำงานปกติ (Online)</span>
          </div>
          <div class="text-caption text-medium-emphasis">
            Client Version: 1.0.5 <br>
            Database: IndexedDB Ready
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db } from '@/db'
import { formatTime } from '@/utils/formatHelper'

// State
const stats = ref({
  totalLeads: 0,
  todayLeads: 0,
  pendingLeads: 0,
  wonLeads: 0
})

const recentLeads = ref<any[]>([])

// Logic
const fetchDashboardData = async () => {
  try {
    // Recent Leads (Timeline)
    const recents = await db.leads
      .orderBy('id')
      .reverse()
      .limit(6) // ดึงมา 6 รายการให้ Timeline ดูยาวขึ้นนิดนึง
      .toArray()
    recentLeads.value = recents

    // Stats Logic
    stats.value.totalLeads = await db.leads.count()
    
    // นับตามเงื่อนไข (Mockup Logic)
    stats.value.pendingLeads = await db.leads
      .filter(l => l.status.includes('ติดตาม') || l.status.includes('สนใจ'))
      .count()
      
    stats.value.wonLeads = await db.leads
      .filter(l => l.status.includes('อนุมัติ') || l.status.includes('ผ่าน'))
      .count()

    const startOfDay = new Date()
    startOfDay.setHours(0,0,0,0)
    stats.value.todayLeads = await db.leads
      .where('createdAt')
      .aboveOrEqual(startOfDay.getTime())
      .count()

  } catch (error) {
    console.error("Dashboard Error:", error)
  }
}

// Color Helper
const getStatusColor = (status: string) => {
  if (status.includes('อนุมัติ') || status.includes('ผ่าน')) return 'success'
  if (status.includes('ติดตาม') || status.includes('สนใจ')) return 'warning'
  if (status.includes('ยกเลิก') || status.includes('ไม่ผ่าน')) return 'error'
  return 'grey'
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<style scoped>
/* CSS ตกแต่งเพิ่มเติมสำหรับ Card พื้นหลัง */
.absolute-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translate(30%, -30%);
  filter: blur(20px);
}
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s;
}
.cursor-pointer:hover {
  transform: translateY(-2px);
}
</style>