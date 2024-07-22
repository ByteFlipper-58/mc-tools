<!--src/components/Card.vue-->
<template>
  <div
    class="card bg-neutral text-neutral-content shadow-xl p-5 transition-transform transition-shadow transition-filter transition-border hover:shadow-2xl hover:scale-105 hover:brightness-110 hover:translate-y-[-5px] hover:border hover:border-base-100"
    @click="handleClick"
  >
    <div v-if="imageSrc" class="avatar mx-auto mb-4">
      <div class="w-24 rounded-full">
        <img :src="imageSrc" alt="Card image" />
      </div>
    </div>
    <div :class="textAlignmentClass">
      <h2 :style="{ fontWeight: 'bold', textAlign: textAlign }">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    imageSrc: {
      type: String,
      default: '',
      validator(value) {
        return /\.(png|gif|svg|jpg|jpeg)$/.test(value);
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    textAlign: {
      type: String,
      default: 'center',
      validator(value) {
        return ['left', 'center', 'right'].includes(value);
      },
    },
    onClick: {
      type: Function,
      default: () => {}, // Default to an empty function if no onClick handler is provided
    },
  },
  computed: {
    textAlignmentClass() {
      switch (this.textAlign) {
        case 'left':
          return 'text-left';
        case 'right':
          return 'text-right';
        case 'center':
        default:
          return 'text-center';
      }
    },
  },
  methods: {
    handleClick() {
      if (this.onClick) {
        this.onClick(); // Call the onClick function if provided
      }
    },
  },
};
</script>

<style scoped>
.avatar img {
  object-fit: cover;
}

.card {
  transition: 
    transform 0.3s ease, 
    box-shadow 0.3s ease, 
    filter 0.3s ease, 
    border 0.3s ease;
  border: 2px solid transparent; /* Default border */
}

.card:hover {
  filter: brightness(110%); /* Slightly increase brightness */
  transform: scale(1.05) translateY(-5px); /* Slightly enlarge and lift */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); /* Increased shadow on hover */
  border-color: #f9fafb; /* bg-base-100 color for border */
}
</style>