<!-- src/App.vue -->
<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script>
import Layout from './layouts/Layout.vue';

export default {
  components: {
    Layout,
  },
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>