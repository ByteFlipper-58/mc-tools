<!-- src/views/Home.vue -->
<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Home Screen</h1>
    <p class="text-lg mb-4">Welcome to the home screen! Here are some sample cards.</p>
    <div class="flex flex-wrap gap-4 justify-center">
      <div class="flex justify-center w-full md:w-1/2 lg:w-1/3">
        <Card
          imageSrc="https://th.bing.com/th/id/OIP.LwIo405dICgXs4qP3x24kQHaHa?rs=1&pid=ImgDetMain"
          title="Stronghold Finder with Throw Angle"
        description="Find the stronghold location using the throw angle of the Ender Pearl"
          textAlign="center"
          @click="handleCardClick"
        />
      </div>
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

    const handleCardClick = () => {
      router.push({ name: 'StrongholdFinder' });
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