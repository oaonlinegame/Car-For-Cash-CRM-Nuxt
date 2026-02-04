<template>
  <div>

    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <div class="text-h5 font-weight-bold">
          Dashboard
        </div>
        <div class="text-grey">
          ภาพรวมธุรกิจสินเชื่อวันนี้
        </div>
      </div>

      <v-btn
        color="primary"
        rounded="xl"
        prepend-icon="mdi-account-plus"
      >
        เพิ่มลูกค้า
      </v-btn>
    </div>

    <!-- KPI -->
    <v-row>
      <v-col
        v-for="card in kpis"
        :key="card.title"
        cols="12"
        md="3"
      >
        <v-card
          rounded="xl"
          class="hover-lift"
        >
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-grey">
                  {{ card.title }}
                </div>
                <div class="text-h5 font-weight-bold">
                  {{ card.value }}
                </div>
              </div>

              <v-icon
                :color="card.color"
                size="36"
              >
                {{ card.icon }}
              </v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Middle Section -->
    <v-row class="mt-2">
      <!-- Chart -->
      <v-col cols="12" md="8">
        <v-card rounded="xl">
          <v-card-title class="font-weight-bold">
            📈 ปล่อยสินเชื่อรายเดือน
          </v-card-title>
          <v-card-text class="text-grey">
            (ตรงนี้สามารถใส่ chart.js / echarts ได้)
            <div class="chart-placeholder">
              Monthly Loan Chart
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Tasks -->
      <v-col cols="12" md="4">
        <v-card rounded="xl">
          <v-card-title class="font-weight-bold">
            ☎️ งานติดตามวันนี้
          </v-card-title>

          <v-list density="compact">
            <v-list-item
              v-for="task in tasks"
              :key="task.name"
              :title="task.name"
              :subtitle="task.time"
              prepend-icon="mdi-phone"
            />
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Leads -->
    <v-card rounded="xl" class="mt-6">
      <v-card-title class="font-weight-bold">
        🚗 ลูกค้าเข้าใหม่ล่าสุด
      </v-card-title>

      <v-table>
        <thead>
          <tr>
            <th>ชื่อลูกค้า</th>
            <th>รถ</th>
            <th>วงเงิน</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in leads" :key="lead.name">
            <td>{{ lead.name }}</td>
            <td>{{ lead.car }}</td>
            <td>{{ lead.amount }}</td>
            <td>
              <v-chip
                size="small"
                :color="lead.color"
                variant="flat"
              >
                {{ lead.status }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

  </div>
</template>

<script setup>
const kpis = [
  {
    title: 'ลูกค้าใหม่วันนี้',
    value: '12 ราย',
    icon: 'mdi-account-plus',
    color: 'primary',
  },
  {
    title: 'ยอดปล่อยสินเชื่อ',
    value: '฿1,250,000',
    icon: 'mdi-cash-multiple',
    color: 'green',
  },
  {
    title: 'รออนุมัติ',
    value: '8 สัญญา',
    icon: 'mdi-timer-sand',
    color: 'orange',
  },
  {
    title: 'ค้างติดตาม',
    value: '5 ราย',
    icon: 'mdi-alert',
    color: 'red',
  },
]

const tasks = [
  { name: 'โทรติดตามคุณสมชาย', time: '10:30' },
  { name: 'นัดรับเอกสารคุณวิภา', time: '13:00' },
  { name: 'แจ้งผลอนุมัติ', time: '16:00' },
]

const leads = [
  {
    name: 'คุณเอกชัย',
    car: 'Toyota Hilux',
    amount: '฿300,000',
    status: 'รอเอกสาร',
    color: 'orange',
  },
  {
    name: 'คุณศิริพร',
    car: 'Honda City',
    amount: '฿180,000',
    status: 'อนุมัติ',
    color: 'green',
  },
]
</script>

<style scoped>
.hover-lift {
  transition: all 0.25s ease;
}
.hover-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

.chart-placeholder {
  height: 260px;
  border-radius: 16px;
  background: linear-gradient(135deg, #e3f2fd, #fce4ec);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
