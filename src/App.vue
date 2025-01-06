<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script>
import { onMounted, ref } from 'vue';
import Layout from './layouts/Layout.vue';
import i18n from './i18n'; // Импортируем i18n

export default {
  components: {
    Layout,
  },
  setup() {
    const isTelegram = ref(false);
    const languageLoaded = ref(false);
   // const adShown = ref(false); // Флаг для отслеживания показа рекламы

    // то тоFunction to hide header and footer
    const hideHeaderAndFooter = () => {
      if (isTelegram.value) {
        document.querySelector('header')?.style.setProperty('display', 'none');
        document.querySelector('footer')?.style.setProperty('display', 'none');
      }
    };

    // Function to check if the app is running in Telegram Web App
    const checkIfTelegram = () => {
      const initParams = sessionStorage.getItem('__telegram__initParams');
      isTelegram.value = initParams !== '{}';
      hideHeaderAndFooter();
    };

    // Function to determine the user's language and set it in i18n
    const determineUserLanguage = () => {
      const userLanguageCode = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code || 'en';

      if (['ru', 'be', 'uk'].includes(userLanguageCode)) {
        i18n.global.locale = 'ru';
      } else {
        i18n.global.locale = 'en';
      }
      languageLoaded.value = true; // Язык загружен
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

    // Function to initialize and show AdsGram ad
  /*  const showAd = () => {
      const AdController = window.Adsgram.init({ blockId: '1629' });
      AdController.show()
        .then((result) => {
          console.log('Ad watched till the end:', result);
          adShown.value = true; // Реклама показана
        })
        .catch((result) => {
          console.log('Ad not watched till the end or error occurred:', result);
          adShown.value = false; // Реклама не показана
        });
    };*/

    onMounted(() => {
      // Determine user's language and set it in i18n
      determineUserLanguage();
      // Check if the app is running in Telegram
      checkIfTelegram();
      // Show ad if it's the first time app is opened
      if (!adShown.value) {
        //showAd();
      }
    });

    return { languageLoaded };
  },
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>