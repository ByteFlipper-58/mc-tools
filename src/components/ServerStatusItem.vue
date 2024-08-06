<template>
    <div>
      <div class="font-bold">{{ $t(title) }}</div>
      <div v-if="html" v-html="content" class="bg-gray-700 p-2 rounded"></div>
      <div v-else>{{ content }}</div>
      <hr class="border-gray-600">
    </div>
  </template>
  
  <script lang="ts" setup>
  const props = defineProps<{ title: string, content: string, html: boolean }>();
  </script>
  
  <style scoped>
  .bg-gray-700 {
    background-color: #2d3748;
  }
  .border-gray-600 {
    border-color: #4a5568;
  }
  </style>  