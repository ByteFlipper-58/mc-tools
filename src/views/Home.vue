<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Welcome to MC Tools!</h1>
    <p class="text-lg mb-4">This is a collection of powerful tools for Minecraft.</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        imageSrc="https://cdn-icons-png.flaticon.com/512/1055/1055664.png"
        title="Your Advertisement"
        description="Here could be your advertisement"
        textAlign="center"
        @click="() => {}"
      />
      <Card
        imageSrc="https://github.com/ByteFlipper-58/mc-tools/blob/master/src/assets/logos/stronghold_finder.png?raw=true"
        title="Stronghold Finder with Throw Angle"
        description="Find the stronghold location using the throw angle of the Ender Pearl"
        textAlign="center"
        @click="() => handleCardClick('StrongholdFinder')"
      />
      <Card
        imageSrc="https://is2-ssl.mzstatic.com/image/thumb/Purple122/v4/37/74/02/377402c0-920a-0340-5748-f2e51709412c/AppIcon-0-1x_U007emarketing-0-7-0-P3-85-220.png/512x512bb.jpg"
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

    return {
      handleCardClick,
    };
  },
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>
