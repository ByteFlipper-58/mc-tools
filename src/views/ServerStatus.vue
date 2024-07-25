<template>
    <div class="p-6 max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">Minecraft Server Status</h1>
        <p class="text-lg mb-4">Quickly retrieve the status of any Minecraft server.</p>
  
      <div class="mt-4 flex flex-col lg:flex-row lg:justify-center lg:gap-4">
        <button 
          @click="goBack" 
          class="btn btn-secondary w-full lg:w-auto mt-2 lg:mt-0"
        >
          Go Back
        </button>
      </div>
  
      <Popup v-if="isTelegram" 
             :message="popupMessage" 
             @close="handlePopupClose" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { Popup } from 'vue-tg';
  
  const router = useRouter();
  const isTelegram = inject('isTelegram', false);
  
  const popupMessage = ref('');
  
  function handlePopupClose() {
    // Handle popup close if needed
  }
  
  function goBack() {
    if (isTelegram) {
      window.Telegram.WebApp.close();
    } else {
      router.back();
    }
  }
  </script>
  
  <style scoped>
  @import "tailwindcss/tailwind.css";
  </style>  