<template>
  <v-app>
    <v-navigation-drawer 
      v-model="drawer" 
      :rail="rail"
      permanent
      @click="rail = false"
      elevation="2"
      class="border-none"
    >
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-circle.png" 
        title="Car Cash CRM"
        subtitle="ระบบสินเชื่อรถยนต์"
        class="py-4"
        nav
      >
        <template v-slot:append>
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            size="small"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        
        <v-list-item 
          prepend-icon="mdi-view-dashboard-outline" 
          title="Dashboard" 
          to="/"
          color="primary"
          class="mb-1"
        ></v-list-item>

        <v-list-subheader v-if="!rail" class="text-caption font-weight-bold mt-4 mb-2">งานสินเชื่อ</v-list-subheader>
        
        <v-list-item 
          prepend-icon="mdi-account-group-outline" 
          title="ลูกค้าทั้งหมด (Leads)" 
          to="/test-lab"
          color="primary"
        ></v-list-item>

        <v-list-item 
          prepend-icon="mdi-file-document-edit-outline" 
          title="เปิดใบคำขอใหม่" 
          link
          color="primary"
        ></v-list-item>

        <v-list-item 
          prepend-icon="mdi-calculator-variant-outline" 
          title="คำนวณค่างวด" 
          link
          color="primary"
        ></v-list-item>

        <v-list-subheader v-if="!rail" class="text-caption font-weight-bold mt-4 mb-2">รายงาน & ติดตาม</v-list-subheader>
        
        <v-list-item 
          prepend-icon="mdi-chart-box-outline" 
          title="สรุปยอดประจำเดือน" 
          link
        ></v-list-item>

         <v-list-item 
          prepend-icon="mdi-calendar-clock-outline" 
          title="นัดหมายวันนี้" 
          link
          append-icon="mdi-circle-small text-error"
        ></v-list-item>

      </v-list>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="คุณสมชาย ใจดี"
          subtitle="เจ้าหน้าที่สินเชื่อ"
          class="py-3"
        >
          <template v-slot:append>
             <v-btn icon="mdi-logout" variant="text" size="small" color="error"></v-btn>
          </template>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar elevation="0" border class="bg-surface">
      <v-app-bar-title class="font-weight-bold text-primary">
        สาขาสิงห์บุรี <span class="text-caption text-medium-emphasis ml-2">| Online</span>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center gap-2 mr-2">
        
        <v-btn icon class="mr-1">
          <v-badge content="3" color="error" dot>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <v-btn 
          icon 
          @click="toggleTheme" 
          variant="tonal" 
          :color="currentTheme === 'dark' ? 'warning' : 'primary'"
          class="ml-2"
        >
          <v-icon>{{ currentTheme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
          <v-tooltip activator="parent" location="bottom">
            {{ currentTheme === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด' }}
          </v-tooltip>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

const drawer = ref(true)
const rail = ref(false) // State ควบคุม Mini Variant (ย่อแถบเมนู)
const theme = useTheme()

const currentTheme = computed(() => theme.global.name.value)

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
/* ปรับแต่ง Scrollbar ให้สวยงาม */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 4px;
}
.v-theme--dark .bg-grey-lighten-4 {
  background-color: #0f1214 !important; /* พื้นหลัง Dark mode ให้เข้มขึ้น */
}
</style>