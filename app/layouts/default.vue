<template>
  <v-app>
    <!-- ================= Sidebar ================= -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      elevation="2"
      class="main-sidebar"
    >
      <!-- Brand Header -->
      <div class="brand-header" :class="{ 'rail-mode': rail }">
        <div class="brand-logo">
          <v-avatar color="primary" variant="tonal" size="40" rounded="lg">
            <v-icon icon="mdi-car-convertible" size="24" color="primary" />
          </v-avatar>
        </div>

        <div class="brand-text">
          <div class="text-h6 font-weight-black text-truncate">Car Cash</div>
          <div
            class="text-caption font-weight-bold text-primary"
            style="letter-spacing: 2px"
          >
            CRM SYSTEM
          </div>
        </div>

        <!-- Toggle Sidebar -->
      </div>

      <v-divider />

      <!-- Menu -->
      <v-list density="compact" nav class="mt-2">
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          to="/"
          rounded="lg"
        />
        <v-list-item
          prepend-icon="mdi-flask-outline"
          title="Test Lab"
          to="/test-lab"
          rounded="lg"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- ================= App Bar ================= -->
    <v-app-bar elevation="0" border class="main-app-bar">
      <v-btn
        icon
        variant="text"
        size="small"
        color="medium-emphasis"
        @click.stop="toggleRail"
      >
        <v-icon>
          {{ rail ? "mdi-chevron-right" : "mdi-chevron-left" }}
        </v-icon>
      </v-btn>

      <v-app-bar-title class="font-weight-bold text-primary">
        สาขาสิงห์บุรี
        <span class="text-caption text-medium-emphasis ml-2">| Online</span>
      </v-app-bar-title>

      <!-- Search -->

      <v-spacer />

      <div class="d-flex align-center gap-2 mr-2">
        <v-btn icon>
          <v-badge dot color="error">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- Theme Toggle -->
        <v-btn
          icon
          variant="tonal"
          @click="toggleTheme"
          :color="currentTheme === 'dark' ? 'warning' : 'primary'"
        >
          <v-icon>
            {{
              currentTheme === "dark"
                ? "mdi-white-balance-sunny"
                : "mdi-moon-waning-crescent"
            }}
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- ================= Main ================= -->
    <v-main class="main-content">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(true);
const rail = useState<boolean>("drawer-rail", () => false);

const toggleRail = () => {
  rail.value = !rail.value;
};

// ===== Theme =====
const theme = useTheme();
const currentTheme = computed(() => theme.global.name.value);

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === "dark" ? "light" : "dark";
};
</script>

<style scoped>
/* ======================================================
  Scrollbar
====================================================== */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #9e9e9e;
  border-radius: 4px;
}

/* ======================================================
  Light Mode
====================================================== */
.main-sidebar {
  background: #ffffff;
  transition: width 0.25s ease;
}

.main-app-bar {
  background: #ffffff;
}

.main-content {
  background: #f4f6f8;
}

/* ======================================================
  Dark Mode
====================================================== */
.v-theme--dark .main-sidebar {
  background: #111827; /* navy dark */
  color: #e5e7eb;
  border-right: 1px solid #1f2937;
}

.v-theme--dark .main-app-bar {
  background: #0f172a;
}

.v-theme--dark .main-content {
  background: #020617;
}

/* ======================================================
  Brand Header
====================================================== */
.brand-header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  transition: all 0.2s ease;
}

.brand-text {
  margin-left: 12px;
  white-space: nowrap;
  transition: opacity 0.15s ease;
}

.toggle-btn {
  margin-left: auto;
}

/* Rail Mode */
.brand-header.rail-mode {
  justify-content: center;
  padding: 0;
}

.brand-header.rail-mode .brand-text,
.brand-header.rail-mode .toggle-btn {
  opacity: 0;
  width: 0;
  pointer-events: none;
  position: absolute;
}

/* ======================================================
  Menu
====================================================== */
.v-list-item--nav {
  margin-bottom: 4px;
}

.v-theme--dark .v-list-item--nav {
  color: #d1d5db;
}

.v-theme--dark .v-list-item--nav:hover {
  background: rgba(255, 255, 255, 0.06);
}

.v-theme--dark .v-list-item--active {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.25), transparent);
}
</style>
