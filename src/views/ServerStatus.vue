<template>
  <div class="p-4 sm:p-6 max-w-2xl mx-auto bg-gray-900 text-white">
    <h1 class="text-2xl sm:text-3xl font-bold mb-4">{{ $t('serverStatusPage.welcomeMessage') }}</h1>
    <p class="text-base sm:text-lg mb-4">{{ $t('serverStatusPage.description') }}</p>

    <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
      <!-- Version Selection -->
      <select v-model="selectedVersion" class="select select-bordered w-full sm:w-1/3 mt-2 sm:mt-0">
        <option value="java">Java</option>
        <option value="bedrock">Bedrock</option>
      </select>
      <!-- Host Address Input -->
      <input 
        v-model="hostAddress"
        type="text" 
        :placeholder="$t('serverStatusPage.enterHostAdres')" 
        class="input input-bordered w-full sm:flex-1 mt-2 sm:mt-0" 
      />
      <!-- Check Status Button -->
      <button 
        @click="checkStatus" 
        class="btn btn-primary w-full sm:w-1/3 mt-2 sm:mt-0"> {{ $t('serverStatusPage.checkStatus') }} </button>
    </div>

    <div class="mt-4 flex flex-col sm:flex-row sm:justify-center sm:gap-4">
      <!-- Go Back Button -->
      <button 
        @click="goBack" 
        class="btn btn-secondary w-full sm:w-auto mt-2 sm:mt-0"> {{ $t('ui.back') }}</button>
    </div>

    <!-- Server Status Display -->
    <div v-if="serverStatus" class="mt-6">
      <h2 class="text-xl sm:text-2xl font-bold mb-4">{{$t('serverStatusPage.serverStatus')}}</h2>
      <div class="card w-full bg-gray-800 shadow-xl text-white">
        <div class="card-body">
          <div class="flex flex-col gap-y-4">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.status') }}</div>
              <div :class="serverStatus.online ? 'bg-green-500' : 'bg-red-500'" class="p-2 rounded">
                {{ serverStatus.online ? $t('serverStatusPage.online') : $t('serverStatusPage.offline') }}
              </div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.host') }}</div>
              <div>{{ serverStatus.host || 'N/A' }}</div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.ipAddress') }}</div>
              <div>{{ serverStatus.ip_address ? `${serverStatus.ip_address}:${serverStatus.port}` : 'N/A' }}</div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.icon') }}</div>
              <div><img :src="serverStatus.icon || 'N/A'" alt="Server Icon" class="w-16 h-16" /></div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.motd') }}</div>
              <div v-html="serverStatus.motd?.html || 'N/A'" class="bg-gray-700 p-2 rounded"></div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.version') }}</div>
              <div v-html="serverStatus.version?.name_html || serverStatus.version?.name_clean || 'N/A'" class="bg-gray-700 p-2 rounded"></div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.players') }}</div>
              <div>{{ serverStatus.players ? `${serverStatus.players.online} / ${serverStatus.players.max}` : 'N/A' }}</div>
              <button @click="togglePlayers" class="btn btn-info btn-sm mt-2">{{ $t('serverStatusPage.togglePlayers') }}</button>
              <div class="overflow-x-auto mt-2">
                <table v-if="showPlayers && serverStatus.players?.list?.length" class="table bg-gray-700 p-2 rounded">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>UUID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(player, index) in serverStatus.players.list" :key="player.uuid">
                      <td>{{ index + 1 }}</td>
                      <td v-html="player.name_html"></td>
                      <td>{{ player.uuid }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.mods') }}</div>
              <div>{{ serverStatus.mods ? serverStatus.mods.length : 'N/A' }}</div>
              <button @click="toggleMods" class="btn btn-info btn-sm mt-2">{{ $t('serverStatusPage.toggleMods') }}</button>
              <div class="overflow-x-auto mt-2">
                <table v-if="showModsList && serverStatus.mods?.length" class="table bg-gray-700 p-2 rounded">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(mod, index) in serverStatus.mods" :key="mod.name">
                      <td>{{ index + 1 }}</td>
                      <td>{{ mod.name }}</td>
                      <td>{{ mod.version }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.plugins') }}</div>
              <div>{{ serverStatus.plugins ? serverStatus.plugins.length : 'N/A' }}</div>
              <button @click="togglePlugins" class="btn btn-info btn-sm mt-2">{{ $t('serverStatusPage.togglePlugins') }}</button>
              <div class="overflow-x-auto mt-2">
                <table v-if="showPluginsList && serverStatus.plugins?.length" class="table bg-gray-700 p-2 rounded">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Version</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(plugin, index) in serverStatus.plugins" :key="plugin.name">
                      <td>{{ index + 1 }}</td>
                      <td>{{ plugin.name }}</td>
                      <td>{{ plugin.version }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.eulaBlocked') }}</div>
              <div>{{ serverStatus.eula_blocked !== undefined ? (serverStatus.eula_blocked ? 'Yes' : 'No') : 'N/A' }}</div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.protocolVersion') }}</div>
              <div>{{ serverStatus.version?.protocol || 'N/A' }}</div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.software') }}</div>
              <div>{{ serverStatus.software || 'N/A' }}</div>
            </div>
            <hr class="border-gray-600">
            <div>
              <div class="font-bold">{{ $t('serverStatusPage.srvRecord') }}</div>
              <div>{{ serverStatus.srv_record ? `${serverStatus.srv_record.host}:${serverStatus.srv_record.port}` : 'N/A' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Telegram Popup -->
    <Popup v-if="isTelegram" 
           :message="popupMessage" 
           @close="handlePopupClose" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
  console.log('Fetching data from API:', `https://api.mcstatus.io/v2/status/${javaOrBedrock}/${host}`); // Debug log
  try {
    const response = await axios.get(`https://api.mcstatus.io/v2/status/${javaOrBedrock}/${host}`);
    console.log('API response:', response.data); // Debug log
    serverStatus.value = response.data;
  } catch (error) {
    console.error("Error fetching server status:", error);
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

onMounted(() => {
  const { javaOrBedrock, host } = getQueryParams();
  if (host) {
    selectedVersion.value = javaOrBedrock;
    hostAddress.value = host;
    fetchServerStatus();
  }

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

function getQueryParams() {
  const params = route.query;
  console.log('Route query params:', params); // Debug log
  const javaOrBedrock = params.java ? 'java' : 'bedrock';
  const host = params.java || params.bedrock;
  return { javaOrBedrock, host };
}
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
body {
  background-color: #1a202c; /* Set dark background */
  color: #e2e8f0; /* Set light text color */
}

.card-body {
  background-color: #2d3748; /* Set dark background for card body */
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 4px; /* Add padding */
  border-bottom: 1px solid #4a5568; /* Set border color */
}

.table th {
  text-align: left; /* Align header text to the left */
}

.list-disc {
  list-style-type: none; /* Remove default list style */
  padding-left: 0; /* Remove default padding */
  margin: 0.5rem 0; /* Add some space between items */
}

.player-list li, .list-decimal li {
  padding: 4px 0; /* Add padding */
}

.player-list span a {
  color: inherit; /* Inherit text color */
  text-decoration: underline; /* Underline the text */
}

.overflow-x-auto {
  overflow-x: auto; /* Enable horizontal scrolling */
}
</style>