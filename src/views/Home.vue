<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">{{ $t('home.welcomeMessage') }}</h1>
    <p class="text-lg mb-4">{{ $t('home.description') }}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        imageSrc="https://github.com/ByteFlipper-58/mc-tools/blob/master/src/assets/logos/byteflipper.png?raw=true"
        :title="$t('home.cards.byteflipper.title')"
        :description="$t('home.cards.byteflipper.description')"
        textAlign="center"
        @click="openTelegramChannel"
      />
      <Card
        imageSrc="https://github.com/ByteFlipper-58/mc-tools/blob/master/src/assets/logos/stronghold_finder.png?raw=true"
        :title="$t('home.cards.strongholdFinder.title')"
        :description="$t('home.cards.strongholdFinder.description')"
        textAlign="center"
        @click="() => handleCardClick('StrongholdFinder')"
      />
      <Card
        imageSrc="https://github.com/ByteFlipper-58/mc-tools/blob/master/src/assets/logos/server_status.png?raw=true"
        :title="$t('home.cards.serverStatus.title')"
        :description="$t('home.cards.serverStatus.description')"
        textAlign="center"
        @click="() => handleCardClick('ServerStatus')"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card,
  },
  setup() {
    const router = useRouter();

    const handleCardClick = (routeName) => {
      router.push({ name: routeName });
    };

    const openTelegramChannel = () => {
      window.open('https://t.me/byteflipper', '_blank');
    };

    return {
      handleCardClick,
      openTelegramChannel
    };
  },
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>
