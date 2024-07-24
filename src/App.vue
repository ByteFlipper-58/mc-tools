<!-- src/App.vue -->
<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script>
import { onMounted, ref } from 'vue';
import Layout from './layouts/Layout.vue';

export default {
  components: {
    Layout,
  },
  setup() {
    const isTelegram = ref(false);

    // Function to hide header and footer
    const hideHeaderAndFooter = () => {
      if (isTelegram.value) {
        document.querySelector('header')?.style.setProperty('display', 'none');
        document.querySelector('footer')?.style.setProperty('display', 'none');
      }
    };

    // Function to check if the app is running in Telegram Web App
    const checkIfTelegram = () => {
      const initParams = sessionStorage.getItem('__telegram__initParams');
      if (initParams === '{}') {
        isTelegram.value = false;
      } else {
        isTelegram.value = true;
      }
      hideHeaderAndFooter();
    };

    // Function to load Eruda
    const loadEruda = () => {
      if (process.env.NODE_ENV === 'development' || isTelegram.value) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda';
        script.onload = () => {
          if (window.eruda) {
            window.eruda.init();
          }
        };
        document.head.appendChild(script);
      }
    };

    onMounted(() => {
      // Check if the app is running in Telegram
      checkIfTelegram();
      loadEruda();
    });

    return {};
  },
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>