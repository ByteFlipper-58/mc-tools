<template>
    <div class="flex flex-col min-h-screen">
      <!-- Header -->
      <header class="bg-gray-800 text-white p-4">
        <h1 class="text-2xl font-bold">MC Tools</h1>
      </header>
  
      <!-- Main Content -->
      <main class="flex-grow flex justify-center items-center p-4">
        <slot></slot>
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-white p-4 text-center font-bold">
        &copy; 2024 MC Tools by ByteFlipper
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Layout',
  };
  </script>
  
  <style scoped>
  /* Add any additional custom styles here */
  </style>