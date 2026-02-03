<template>
  <v-card class="pa-4 my-2" border color="blue-lighten-5">
    <div class="text-subtitle-1 font-weight-bold mb-2">
      🧩 Component ย่อย (ลูก)
    </div>
    
    <p>แม่ส่งมาว่า: <span class="text-error">{{ statusText }}</span></p>

    <v-btn 
      size="small" 
      color="primary" 
      class="mt-2"
      @click="$emit('reply', 'ลูกตอบรับทราบแล้วครับ! (' + new Date().getSeconds() + ')')">
      ส่งข้อความกลับหาแม่
    </v-btn>
  </v-card>
</template>

<script setup>
// รับค่าจากแม่
defineProps(['statusText'])
// เตรียมส่งค่ากลับ
defineEmits(['reply'])
</script>