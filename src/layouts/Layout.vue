<!-- src/layouts/Layout.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-neutral p-4">
      <h1 class="text-2xl font-bold">MC Tools</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow p-4">
      <router-view></router-view> <!-- This will render the current route's component -->
    </main>

    <!-- Footer -->
    <footer class="bg-neutral text-sm p-4 text-center font-bold">
      <span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        &copy; 2024 MC Tools by 
        <a 
          href="https://example.com" 
          target="_blank" 
          rel="noopener noreferrer">
          ByteFlipper
        </a>
      </span>
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
