<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">{{ $t('strongholdFinderPage.title') }}</h1>
    <p class="text-lg mb-4">{{ $t('strongholdFinderPage.description') }}</p>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ $t('strongholdFinderPage.firstLocation') }}</h2>
      <form @submit.prevent="findStronghold" class="space-y-4">
        <div class="lg:grid lg:grid-cols-3 lg:gap-4">
          <div class="form-control lg:col-span-1">
            <label for="firstCoordinatesX" class="label">
              <span class="label-text">{{ $t('strongholdFinderPage.xCoordinate') }}</span>
            </label>
            <input 
              type="number" 
              id="firstCoordinatesX" 
              v-model.number="firstCoordinatesX" 
              :placeholder="$t('strongholdFinderPage.enterXCoordinate')" 
              class="input input-bordered w-full" 
              step="any"
              min="-1000000" 
            />
          </div>
          <div class="form-control lg:col-span-1">
            <label for="firstCoordinatesZ" class="label">
              <span class="label-text">{{ $t('strongholdFinderPage.zCoordinate') }}</span>
            </label>
            <input 
              type="number" 
              id="firstCoordinatesZ" 
              v-model.number="firstCoordinatesZ" 
              :placeholder="$t('strongholdFinderPage.enterZCoordinate')" 
              class="input input-bordered w-full" 
              step="any"
              min="-1000000" 
            />
          </div>
          <div class="form-control lg:col-span-1">
            <label for="firstAngle" class="label">
              <span class="label-text">{{ $t('strongholdFinderPage.angleOfTheThrow') }}</span>
            </label>
            <input 
              type="number" 
              id="firstAngle" 
              v-model.number="firstAngle" 
              :placeholder="$t('strongholdFinderPage.enterAngleInDegrees')" 
              class="input input-bordered w-full" 
              step="any"
              min="-360" 
              max="360" 
            />
          </div>
        </div>
      </form>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">{{ $t('strongholdFinderPage.secondLocation') }}</h2>
      <form @submit.prevent="findStronghold" class="space-y-4">
        <div class="lg:grid lg:grid-cols-3 lg:gap-4">
          <div class="form-control lg:col-span-1">
            <label for="secondCoordinatesX" class="label">
              <span class="label-text">{{ $t('strongholdFinderPage.xCoordinate') }}</span>
            </label>
            <input 
              type="number" 
              id="secondCoordinatesX" 
              v-model.number="secondCoordinatesX" 
              :placeholder="$t('strongholdFinderPage.enterXCoordinate')" 
              class="input input-bordered w-full" 
              step="any"
              min="-1000000" 
            />
          </div>
          <div class="form-control lg:col-span-1">
            <label for="secondCoordinatesZ" class="label">
              <span class="label-text">{{ $t('strongholdFinderPage.zCoordinate') }}</span>
            </label>
            <input 
              type="number" 
              id="secondCoordinatesZ" 
              v-model.number="secondCoordinatesZ" 
              :placeholder="$t('strongholdFinderPage.enterZCoordinate')" 
              class="input input-bordered w-full" 
              step="any"
              min="-1000000" 
            />
          </div>
          <div class="form-control lg:col-span-1">
            <label for="secondAngle" class="label">
              <span class="label-text">{{ $t('strongholdFinderPage.angleOfTheThrow') }}</span>
            </label>
            <input 
              type="number" 
              id="secondAngle" 
              v-model.number="secondAngle" 
              :placeholder="$t('strongholdFinderPage.enterAngleInDegrees')" 
              class="input input-bordered w-full" 
              step="any"
              min="-360" 
              max="360" 
            />
          </div>
        </div>
      </form>
    </div>

    <div class="mt-4 flex flex-col lg:flex-row lg:justify-center lg:gap-4">
      <button 
        @click="findStronghold" 
        class="btn btn-primary w-full lg:w-auto"
        :disabled="!isFormValid"
      >
        {{ $t('strongholdFinderPage.findStronghold') }}
      </button>
      <button 
        @click="goBack" 
        class="btn btn-secondary w-full lg:w-auto mt-2 lg:mt-0"
      >
        {{ $t('strongholdFinderPage.goBack') }}
      </button>
    </div>

    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
        </form>
        <h3 class="text-lg font-bold">{{ $t('strongholdFinderPage.estimatedStrongholdLocation') }}</h3>
        <p class="py-4">{{ $t('strongholdFinderPage.x') }} {{ strongholdLocation?.x }}</p>
        <p class="py-4">{{ $t('strongholdFinderPage.z') }} {{ strongholdLocation?.z }}</p>
      </div>
    </dialog>

    <Popup v-if="isTelegram" 
           :message="popupMessage" 
           @close="handlePopupClose" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Popup } from 'vue-tg';

const router = useRouter();
const isTelegram = ref(false);

const popupMessage = ref('');

const firstCoordinatesX = ref<number | null>(null);
const firstCoordinatesZ = ref<number | null>(null);
const firstAngle = ref<number | null>(null);
const secondCoordinatesX = ref<number | null>(null);
const secondCoordinatesZ = ref<number | null>(null);
const secondAngle = ref<number | null>(null);
const strongholdLocation = ref<{ x: string, z: string } | null>(null);

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
  const radToDeg = Math.PI / 180;
  const p = radToDeg;
  const cot = (x) => 1 / Math.tan(x);

  const a1 = firstAngle.value ?? 0;
  const a2 = secondAngle.value ?? 0;
  const x1 = firstCoordinatesX.value ?? 0;
  const z1 = firstCoordinatesZ.value ?? 0;
  const x2 = secondCoordinatesX.value ?? 0;
  const z2 = secondCoordinatesZ.value ?? 0;

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
        xOutput = Math.round((x2 * cot(-a2 * p) - z2 + z1) / cot(-a2 * p));
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

    if (isTelegram.value) {
      popupMessage.value = `X: ${xOutput}, Z: ${zOutput}`;
      showPopup();
    } else {
      showModal();
    }
  }
}

function showModal() {
  const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
}

function closeModal() {
  const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
}

function showPopup() {
  const popup = document.querySelector('vue-tg-popup') as any;
  if (popup) {
    popup.show();
  }
}

function handlePopupClose() {
  // Handle popup close if needed
}

function goBack() {
  if (isTelegram.value) {
    window.Telegram.WebApp.BackButton.hide();
    router.back();
  } else {
    router.back();
  }
}

onMounted(() => {
  if (window.Telegram?.WebApp) {
    isTelegram.value = true;
    const backButton = window.Telegram.WebApp.BackButton;

    backButton.show();
    backButton.onClick(goBack);

    onUnmounted(() => {
      backButton.offClick(goBack);
      backButton.hide();
    });
  }
});
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>