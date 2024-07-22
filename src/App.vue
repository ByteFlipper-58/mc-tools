<!--App.vue-->
<template>
  <Layout>
    <div class="mx-auto text-center">
      <h1 class="text-3xl font-bold">Hello World!</h1>

      <Card
      title="Card Without"
      description="This card has no image. It is centered by default."
      textAlign="center"/>
    </div>
  </Layout>
</template>

<script>
import Layout from './layouts/Layout.vue';
import Card from './components/Card.vue';

export default {
  components: {
    Layout,
    Card
  },
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>