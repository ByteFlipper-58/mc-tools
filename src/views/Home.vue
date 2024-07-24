<!-- src/views/Home.vue -->
<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Home Screen</h1>
    <p class="text-lg mb-4">Welcome to the home screen! Here are some sample cards.</p>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card
        imageSrc="https://th.bing.com/th/id/OIP.LwIo405dICgXs4qP3x24kQHaHa?rs=1&pid=ImgDetMain"
        title="Stronghold Finder"
        description="Find your stronghold in the world using Ender Pearl"
        textAlign="center"
        @click="handleCardClick"
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
