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
  srcDir: "app/",
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
          light: {
            dark: false,
            colors: {
              primary: "#1976D2",
              background: "#F0F2F5", // ปรับพื้นหลังให้เป็นเทาอ่อนที่เห็นชัดว่าไม่ใช่สีขาว
              surface: "#FFFFFF", // ให้ Card เป็นสีขาวบริสุทธิ์
              info: "#00CAE3",
              success: "#4CAF50",
              warning: "#FB8C00",
              error: "#FF5252",
            },
          },
          dark: {
            dark: true,
            colors: {
              primary: "#2196F3",
              background: "#0F172A", // พื้นหลังมืดแบบน้ำเงินเข้ม
              surface: "#1E293B", // Card มืด
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
