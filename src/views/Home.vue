<!-- src/views/Home.vue -->
<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">Home Screen</h1>
      <p class="text-lg mb-4">Welcome to the home screen! Here are some sample cards.</p>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="n in 6"
          :key="n"
          title="Card Title"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          textAlign="center"
          :onClick="() => handleCardClick(n)"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Card from '@/components/Card.vue';
  
  export default {
    name: 'Home',
    components: {
      Card,
    },
    methods: {
      handleCardClick(cardNumber) {
        console.log(`Card ${cardNumber} clicked!`); // Handle card click
      },
    },
  };
  </script>
  
  <style scoped>
  @import "tailwindcss/tailwind.css";
  </style>