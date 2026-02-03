// nuxt.config.ts
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",
  ssr: false,

  app: {
    baseURL: "./",
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css",
        },
      ],
    },
  },

  modules: ["vuetify-nuxt-module", "@pinia/nuxt"],

  router: {
    options: {
      hashMode: true,
    },
  },

  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
    },
  },

  // ตั้งค่า Vuetify ให้มี 2 โหมดพร้อมชุดสีที่กำหนดเอง
  // nuxt.config.ts
  // ... (โค้ดส่วนอื่นเหมือนเดิม) ...

  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: "light",
        themes: {
          // 1. โหมดสว่าง
          light: {
            dark: false,
            colors: {
              primary: "#FF6600",
              background: "#F5F5F5",
              surface: "#FFFFFF",
            },
          },
          // 2. โหมดถนอมสายตา (เพิ่มตัวนี้เข้าไป)
          sepia: {
            dark: false,
            colors: {
              primary: "#795548",
              background: "#F4ECD8",
              surface: "#FBFAF3",
            },
          },
          // 3. โหมดมืด
          dark: {
            dark: true,
            colors: {
              primary: "#FF8533",
              background: "#121212",
              surface: "#1E1E1E",
            },
          },
          // 4. โหมดน้ำเงินหรู
          midnight: {
            dark: true,
            colors: {
              primary: "#58A6FF",
              background: "#0D1117",
              surface: "#161B22",
            },
          },
          // 5. โหมดเขียวป่าไม้
          forest: {
            dark: true,
            colors: {
              primary: "#81C784",
              background: "#1B2E1B",
              surface: "#263F26",
            },
          },
          // 6. โหมดไซเบอร์
          cyber: {
            dark: true,
            colors: {
              primary: "#F06292",
              background: "#2B1B2B",
              surface: "#3D263D",
            },
          },
        },
      },
    },
  },
  // ...
});

function defineNuxtConfig(config: any) {
  return config;
}
