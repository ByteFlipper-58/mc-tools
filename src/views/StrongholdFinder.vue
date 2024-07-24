<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-3xl font-bold mb-4">Stronghold Finder</h1>
    <p class="text-lg mb-4">Enter the coordinates and angle of the Ender Pearl throw for two locations to find the stronghold.</p>

    <!-- Form for the first set of coordinates -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">First Location</h2>
      <form @submit.prevent="findStronghold" class="space-y-4">
        <div class="form-control">
          <label for="firstCoordinatesX" class="label">
            <span class="label-text">X Coordinate</span>
          </label>
          <input 
            type="number" 
            id="firstCoordinatesX" 
            v-model.number="firstCoordinatesX" 
            placeholder="Enter X coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="firstCoordinatesZ" class="label">
            <span class="label-text">Z Coordinate</span>
          </label>
          <input 
            type="number" 
            id="firstCoordinatesZ" 
            v-model.number="firstCoordinatesZ" 
            placeholder="Enter Z coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="firstAngle" class="label">
            <span class="label-text">Angle of the Throw</span>
          </label>
          <input 
            type="number" 
            id="firstAngle" 
            v-model.number="firstAngle" 
            placeholder="Enter angle in degrees" 
            class="input input-bordered w-full" 
            step="any"
            min="-360" 
            max="360" 
          />
        </div>
      </form>
    </div>

    <!-- Form for the second set of coordinates -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Second Location</h2>
      <form @submit.prevent="findStronghold" class="space-y-4">
        <div class="form-control">
          <label for="secondCoordinatesX" class="label">
            <span class="label-text">X Coordinate</span>
          </label>
          <input 
            type="number" 
            id="secondCoordinatesX" 
            v-model.number="secondCoordinatesX" 
            placeholder="Enter X coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="secondCoordinatesZ" class="label">
            <span class="label-text">Z Coordinate</span>
          </label>
          <input 
            type="number" 
            id="secondCoordinatesZ" 
            v-model.number="secondCoordinatesZ" 
            placeholder="Enter Z coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="secondAngle" class="label">
            <span class="label-text">Angle of the Throw</span>
          </label>
          <input 
            type="number" 
            id="secondAngle" 
            v-model.number="secondAngle" 
            placeholder="Enter angle in degrees" 
            class="input input-bordered w-full" 
            step="any"
            min="-360" 
            max="360" 
          />
        </div>
      </form>
    </div>

    <!-- Submit Button -->
    <button 
      @click="findStronghold" 
      class="btn btn-primary w-full mt-4"
      :disabled="!isFormValid"
    >
      Find Stronghold
    </button>

    <!-- Go Back Button -->
    <button 
      @click="goBack" 
      class="btn btn-secondary w-full mt-4"
    >
      Go Back
    </button>

    <!-- DaisyUI Modal -->
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
        </form>
        <h3 class="text-lg font-bold">Estimated Stronghold Location</h3>
        <p class="py-4">X: {{ strongholdLocation?.x }}</p>
        <p class="py-4">Z: {{ strongholdLocation?.z }}</p>
      </div>
    </dialog>

    <!-- vue-tg Popup -->
    <Popup v-if="isTelegram" 
           :message="popupMessage" 
           @close="handlePopupClose" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import { Popup } from 'vue-tg';

// Inject isTelegram from the parent component
const isTelegram = inject('isTelegram', false);

const popupMessage = ref('');

// Coordinates and result data
const firstCoordinatesX = ref<number | null>(null);
const firstCoordinatesZ = ref<number | null>(null);
const firstAngle = ref<number | null>(null);
const secondCoordinatesX = ref<number | null>(null);
const secondCoordinatesZ = ref<number | null>(null);
const secondAngle = ref<number | null>(null);
const strongholdLocation = ref<{ x: string, z: string } | null>(null);

// Computed property to check if the form is valid
const isFormValid = computed(() => {
  return (
    firstCoordinatesX.value !== null &&
    firstCoordinatesZ.value !== null &&
    firstAngle.value !== null &&
    secondCoordinatesX.value !== null &&
    secondCoordinatesZ.value !== null &&
    secondAngle.value !== null
  );
});

function findStronghold() {
  // Calculations as per the original script
  const radToDeg = Math.PI / 180;
  const p = radToDeg;
  const cot = (x) => 1 / Math.tan(x);

  const a1 = parseFloat(firstAngle.value ?? '0');
  const a2 = parseFloat(secondAngle.value ?? '0');
  const x1 = parseFloat(firstCoordinatesX.value ?? '0');
  const z1 = parseFloat(firstCoordinatesZ.value ?? '0');
  const x2 = parseFloat(secondCoordinatesX.value ?? '0');
  const z2 = parseFloat(secondCoordinatesZ.value ?? '0');

  if (Math.abs(a1 - a2) < 1) {
    popupMessage.value = "Angles cannot be equal!";
    showPopup();
  } else if ((((a1 < 0) && (a2 > 0)) || ((a1 > 0) && (a2 < 0))) && (Math.abs(Math.abs(Math.abs(a1) - 180) - Math.abs(a2)) < 1)) {
    popupMessage.value = "Angles cannot be opposite!";
    showPopup();
  } else {
    let xOutput, zOutput;

    switch (Math.round(a1)) {
      case -180:
      case 0:
      case 180:
        xOutput = Math.round(x1);
        zOutput = Math.round(cot(-a2 * p) * x1 - (x2 * cot(-a2 * p) - z2));
        break;
      case -90:
      case 90:
        zOutput = Math.round(z1);
        xOutput = Math.round(Math.round(x2 * cot(-a2 * p) - z2 + z1) / cot(-a2 * p));
        break;
      default:
        switch (Math.round(a2)) {
          case -180:
          case 0:
          case 180:
            xOutput = Math.round(x2);
            zOutput = Math.round(cot(-a1 * p) * x2 - (x1 * cot(-a1 * p) - z1));
            break;
          case -90:
          case 90:
            zOutput = Math.round(z2);
            xOutput = Math.round((x1 * cot(-a1 * p) - z1 + z2) / cot(-a1 * p));
            break;
          default:
            xOutput = Math.round(((x1 * cot(-a1 * p) - z1) - (x2 * cot(-a2 * p) - z2)) / (cot(-a1 * p) - cot(-a2 * p)));
            zOutput = Math.round(cot(-a1 * p) * xOutput - (x1 * cot(-a1 * p) - z1));
            break;
        }
        break;
    }

    strongholdLocation.value = { x: xOutput.toString(), z: zOutput.toString() };

    if (isTelegram) {
      popupMessage.value = `X: ${xOutput.toFixed(2)}, Z: ${zOutput.toFixed(2)}`;
      showPopup();
    } else {
      showModal();
    }
  }
}

function showModal() {
  const modal = document.getElementById('my_modal_3');
  if (modal) {
    modal.showModal();
  }
}

function closeModal() {
  const modal = document.getElementById('my_modal_3');
  if (modal) {
    modal.close();
  }
}

function showPopup() {
  const popup = document.querySelector('vue-tg-popup');
  if (popup) {
    (popup as any).show();
  }
}

function handlePopupClose() {
  // Handle popup close if needed
}

function goBack() {
  // Logic for the Go Back button
}
</script>

<style scoped>
/* Add styles if necessary */
</style>
