<template>
  <div class="p-4 sm:p-6 max-w-3xl mx-auto text-white">
    <h1 class="text-2xl sm:text-3xl font-bold mb-4">{{ $t('serverStatusPage.welcomeMessage') }}</h1>
    <p class="text-base sm:text-lg mb-4">{{ $t('serverStatusPage.description') }}</p>

    <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
      <!-- Host Address Input -->
      <input
        ref="hostInput"
        v-model="hostAddress"
        type="text"
        :placeholder="$t('serverStatusPage.enterHostAdres')"
        class="input input-bordered w-full sm:flex-1 mt-2 sm:mt-0 rounded-lg"
      />
      <!-- Version Selection -->
      <select
        ref="versionSelect"
        v-model="selectedVersion"
        class="select select-bordered w-full sm:w-1/3 mt-2 sm:mt-0 rounded-lg"
      >
        <option value="java">Java</option>
        <option value="bedrock">Bedrock</option>
      </select>
    </div>
    <div class="mt-4 flex flex-col sm:flex-row sm:justify-between sm:gap-4">
      <!-- Check Status Button -->
      <button
        ref="checkButton"
        @click="checkStatus"
        class="btn btn-primary w-full mt-2 sm:mt-0 rounded-lg transition-transform hover:scale-105"
        :style="{ minWidth: '150px', width: checkButtonWidth }"
      >
        {{ $t('serverStatusPage.checkStatus') }}
      </button>
      <!-- Go Back Button -->
      <button
        ref="backButton"
        @click="goBack"
        class="btn btn-secondary w-full mt-2 sm:mt-0 rounded-lg transition-transform hover:scale-105"
        :style="{ minWidth: '100px', width: backButtonWidth }"
      >
        {{ $t('ui.back') }}
      </button>
    </div>
    <!-- Server Status Display -->
    <div v-if="serverStatus" class="mt-6">
      <h2 class="text-xl sm:text-2xl font-bold mb-4">{{ $t('serverStatusPage.serverStatus') }}</h2>
      <div
        class="card w-full bg-gray-800 shadow-xl text-white rounded-lg transition-opacity duration-300"
        :class="{ 'opacity-100': serverStatus }"
        :style="{ opacity: serverStatus ? 1 : 0 }"
      >
        <div class="card-body p-4 rounded-lg">
          <!-- Status Display -->
          <div class="mb-4">
            <div
              :class="serverStatus.online ? 'bg-green-600' : 'bg-red-600'"
              class="flex items-center justify-between p-3 rounded-lg shadow-md"
            >
              <span class="font-bold">{{ $t('serverStatusPage.status') }}</span>
              <div class="flex items-center">
                <i
                  :class="
                    serverStatus.online
                      ? 'fi fi-rr-check text-xl mr-2'
                      : 'fi fi-rr-cross text-xl mr-2'
                  "
                ></i>
                <span class="font-bold">{{
                  serverStatus.online
                    ? $t('serverStatusPage.online')
                    : $t('serverStatusPage.offline')
                }}</span>
              </div>
            </div>
          </div>
          <!-- Server Details Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.host') }}</div>
              <div>{{ serverStatus.host || 'N/A' }}</div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.ipAddress') }}</div>
              <div>{{
                serverStatus.ip_address
                  ? `${serverStatus.ip_address}:${serverStatus.port}`
                  : 'N/A'
              }}</div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.icon') }}</div>
              <div>
                <img
                  :src="serverStatus.icon || 'N/A'"
                  alt="Server Icon"
                  class="w-16 h-16 rounded-md"
                />
              </div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.motd') }}</div>
              <div
                v-html="serverStatus.motd?.html || 'N/A'"
                class="bg-gray-600 p-2 rounded-md"
              ></div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.version') }}</div>
              <div
                v-html="
                  serverStatus.version?.name_html ||
                  serverStatus.version?.name_clean ||
                  'N/A'
                "
                class="bg-gray-600 p-2 rounded-md"
              ></div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="flex items-center justify-between">
                 <div class="font-bold">{{ $t('serverStatusPage.players') }}</div>
                   <div class="text-right">
                    {{
                        serverStatus.players
                        ? `${serverStatus.players.online} / ${serverStatus.players.max}`
                        : 'N/A'
                    }}
                    <button
                        @click="togglePlayers"
                        class="btn btn-ghost btn-sm rounded-full transition-transform hover:scale-110 ml-2"
                    >
                        <i
                            :class="
                            showPlayers ? 'fi fi-rr-angle-up' : 'fi fi-rr-angle-down'
                            "
                        ></i>
                    </button>
                    </div>
               </div>
            </div>
          </div>

          <!-- Player List -->
          <div v-if="showPlayers && serverStatus.players?.list?.length" class="overflow-x-auto mt-2">
            <table class="table bg-gray-700 rounded-lg p-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>UUID</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(player, index) in serverStatus.players.list"
                  :key="player.uuid"
                  class="hover:bg-gray-600 transition-colors duration-200"
                >
                  <td>{{ index + 1 }}</td>
                  <td v-html="player.name_html"></td>
                  <td>{{ player.uuid }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Mods List -->
          <div class="mt-4">
            <div
              class="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-md"
            >
              <div class="font-bold">{{ $t('serverStatusPage.mods') }}</div>
                 <div class="text-right">
                    {{ serverStatus.mods ? serverStatus.mods.length : 'N/A' }}
                  <button
                    @click="toggleMods"
                    class="btn btn-ghost btn-sm rounded-full transition-transform hover:scale-110 ml-2"
                   >
                    <i
                      :class="
                        showModsList ? 'fi fi-rr-angle-up' : 'fi fi-rr-angle-down'
                      "
                    ></i>
                    </button>
                 </div>
            </div>
            <div
              v-if="showModsList && serverStatus.mods?.length"
              class="overflow-x-auto mt-2"
            >
              <table class="table bg-gray-700 rounded-lg p-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Version</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(mod, index) in serverStatus.mods"
                    :key="mod.name"
                    class="hover:bg-gray-600 transition-colors duration-200"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ mod.name }}</td>
                    <td>{{ mod.version }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Plugins List -->
          <div class="mt-4">
            <div
              class="flex justify-between items-center bg-gray-700 p-2 rounded-lg shadow-md"
            >
              <div class="font-bold">{{ $t('serverStatusPage.plugins') }}</div>
                 <div class="text-right">
                    {{
                        serverStatus.plugins
                        ? serverStatus.plugins.length
                        : 'N/A'
                   }}
                 <button
                    @click="togglePlugins"
                    class="btn btn-ghost btn-sm rounded-full transition-transform hover:scale-110 ml-2"
                  >
                    <i
                      :class="
                        showPluginsList
                          ? 'fi fi-rr-angle-up'
                          : 'fi fi-rr-angle-down'
                      "
                    ></i>
                    </button>
                </div>
            </div>
            <div
              v-if="showPluginsList && serverStatus.plugins?.length"
              class="overflow-x-auto mt-2"
            >
              <table class="table bg-gray-700 rounded-lg p-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Version</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(plugin, index) in serverStatus.plugins"
                    :key="plugin.name"
                    class="hover:bg-gray-600 transition-colors duration-200"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ plugin.name }}</td>
                    <td>{{ plugin.version }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.eulaBlocked') }}</div>
              <div>
                {{
                  serverStatus.eula_blocked !== undefined
                    ? serverStatus.eula_blocked
                      ? 'Yes'
                      : 'No'
                    : 'N/A'
                }}
              </div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{
                $t('serverStatusPage.protocolVersion')
              }}</div>
              <div>{{ serverStatus.version?.protocol || 'N/A' }}</div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.software') }}</div>
              <div>{{ serverStatus.software || 'N/A' }}</div>
            </div>
            <div class="rounded-lg p-3 bg-gray-700 shadow-md">
              <div class="font-bold">{{ $t('serverStatusPage.srvRecord') }}</div>
              <div>
                {{
                  serverStatus.srv_record
                    ? `${serverStatus.srv_record.host}:${serverStatus.srv_record.port}`
                    : 'N/A'
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Telegram Popup -->
    <Popup v-if="isTelegram" :message="popupMessage" @close="handlePopupClose" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { Popup } from 'vue-tg';

const router = useRouter();
const route = useRoute();
const isTelegram = ref(false);
const popupMessage = ref('');
const selectedVersion = ref('java');
const hostAddress = ref('');
const serverStatus = ref(null);
const showPlayers = ref(false);
const showModsList = ref(false);
const showPluginsList = ref(false);
const hostInput = ref(null);
const versionSelect = ref(null);
const checkButton = ref(null);
const backButton = ref(null);

const checkButtonWidth = ref('auto');
const backButtonWidth = ref('auto');

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

async function checkStatus() {
  console.log('Check Status button clicked'); // Debug log
  serverStatus.value = null; // Clear the current server status
  await fetchServerStatus();
}

async function fetchServerStatus() {
  const javaOrBedrock = selectedVersion.value;
  const host = hostAddress.value;
  console.log(
    'Fetching data from API:',
    `https://api.mcstatus.io/v2/status/${javaOrBedrock}/${host}`
  ); // Debug log
  try {
    const response = await axios.get(
      `https://api.mcstatus.io/v2/status/${javaOrBedrock}/${host}`
    );
    console.log('API response:', response.data); // Debug log
    serverStatus.value = response.data;
  } catch (error) {
    console.error('Error fetching server status:', error);
  }
}

function togglePlayers() {
  showPlayers.value = !showPlayers.value;
}

function toggleMods() {
  showModsList.value = !showModsList.value;
}

function togglePlugins() {
  showPluginsList.value = !showPluginsList.value;
}

onMounted(async () => {
  const { javaOrBedrock, host } = getQueryParams();
  if (host) {
    selectedVersion.value = javaOrBedrock;
    hostAddress.value = host;
    fetchServerStatus();
  }

  await nextTick();
  // Set widths on mount
  updateButtonWidths();

  // Telegram WebApp setup
  if (window.Telegram?.WebApp) {
    isTelegram.value = true;
    const backButton = window.Telegram.WebApp.BackButton;

    backButton.show();
    backButton.onClick(goBack);

    // Cleanup on unmount
    onUnmounted(() => {
      backButton.offClick(goBack);
      backButton.hide();
    });
  }
});

const updateButtonWidths = () => {
    if (hostInput.value && versionSelect.value && checkButton.value && backButton.value) {
        const hostWidth = (hostInput.value as HTMLElement).offsetWidth;
        const selectWidth = (versionSelect.value as HTMLElement).offsetWidth;


        checkButtonWidth.value =  `${Math.max(hostWidth, 150)}px`;
        backButtonWidth.value = `${Math.max(selectWidth, 100)}px`;
    }
};

function getQueryParams() {
  const params = route.query;
  console.log('Route query params:', params); // Debug log
  const javaOrBedrock = params.java ? 'java' : 'bedrock';
  const host = params.java || params.bedrock;
  return { javaOrBedrock, host };
}
</script>

<style scoped>
@import 'tailwindcss/tailwind.css';

body {
  background-color: #1a202c;
  /* Set dark background */
  color: #e2e8f0;
  /* Set light text color */
}

.card-body {
  background-color: #2d3748;
  /* Set dark background for card body */
  border-radius: 0.75rem;
  /* Add border radius to the card body */
}
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 4px;
  /* Add padding */
  border-bottom: 1px solid #4a5568;
  /* Set border color */
}

.table th {
  text-align: left;
  /* Align header text to the left */
}

.overflow-x-auto {
  overflow-x: auto;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>