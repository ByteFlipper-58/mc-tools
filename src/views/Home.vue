<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Welcome to MC Tools!</h1>
    <p class="text-lg mb-4">This is a collection of powerful tools for Minecraft.</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        imageSrc="https://github.com/ByteFlipper-58/mc-tools/blob/master/src/assets/logos/byteflipper.png?raw=true"
        title="ByteFlipper"
        description="Official Developer TG Channel"
        textAlign="center"
        @click="openTelegramChannel"
      />
      <Card
        imageSrc="https://github.com/ByteFlipper-58/mc-tools/blob/master/src/assets/logos/stronghold_finder.png?raw=true"
        title="Stronghold Finder with Throw Angle"
        description="Find the stronghold location using the throw angle of the Ender Pearl"
        textAlign="center"
        @click="() => handleCardClick('StrongholdFinder')"
      />
      <Card
        imageSrc="https://github.com/ByteFlipper-58/mc-tools/blob/master/src/assets/logos/server_status.png?raw=true"
        title="Minecraft Server Status"
        description="Quickly retrieve the status of any Minecraft server"
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
