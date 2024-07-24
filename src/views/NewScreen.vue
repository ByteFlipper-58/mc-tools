<!-- src/views/NewScreen.vue -->
<template>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-4">New Screen</h1>
      <p class="text-lg">Welcome to the new screen! Here you can add any content or components you like.</p>
      <button @click="goBack" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Go Back
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Minecraft Monitoring Server Status',
    methods: {
      goBack() {
        this.$router.push('/'); // Navigate back to the home screen
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add styles for the new screen here */
  </style>
  