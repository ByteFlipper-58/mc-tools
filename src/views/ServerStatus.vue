<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">Minecraft Server Status</h1>
    <p class="text-lg mb-4">Quickly retrieve the status of any Minecraft server.</p>

    <div class="mt-4 flex flex-col lg:flex-row lg:items-center lg:gap-4">
      <!-- Version Selection -->
      <select v-model="selectedVersion" class="select select-bordered w-full lg:w-1/4 mt-2 lg:mt-0">
        <option value="java">Java</option>
        <option value="bedrock">Bedrock</option>
      </select>
      <!-- Host Address Input -->
      <input 
        v-model="hostAddress"
        type="text" 
        placeholder="Enter host address" 
        class="input input-bordered w-full lg:flex-1 mt-2 lg:mt-0" 
      />
      <!-- Check Status Button -->
      <button 
        @click="checkStatus" 
        class="btn btn-primary w-full lg:w-1/4 mt-2 lg:mt-0"
      >
        Check Status
      </button>
    </div>

    <div class="mt-4 flex flex-col lg:flex-row lg:justify-center lg:gap-4">
      <!-- Go Back Button -->
      <button 
        @click="goBack" 
        class="btn btn-secondary w-full lg:w-auto mt-2 lg:mt-0"
      >
        Go Back
      </button>
    </div>

    <!-- Server Status Display -->
    <div v-if="serverStatus" class="mt-6">
      <h2 class="text-2xl font-bold mb-4">Server Status</h2>
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <table class="table w-full">
            <tbody>
              <tr>
                <td class="font-bold">Status:</td>
                <td>{{ serverStatus.online ? 'Online' : 'Offline' }}</td>
              </tr>
              <tr>
                <td class="font-bold">Host:</td>
                <td>{{ serverStatus.host || 'N/A' }}</td>
              </tr>
              <tr>
                <td class="font-bold">IP / Port:</td>
                <td>{{ serverStatus.ip_address ? `${serverStatus.ip_address}:${serverStatus.port}` : 'N/A' }}</td>
              </tr>
              <tr>
                <td class="font-bold">Icon:</td>
                <td><img :src="serverStatus.icon || 'N/A'" alt="Server Icon" class="w-16 h-16" /></td>
              </tr>
              <tr>
                <td class="font-bold">MOTD:</td>
                <td v-html="serverStatus.motd?.html || 'N/A'"></td>
              </tr>
              <tr>
                <td class="font-bold">Version:</td>
                <td>{{ serverStatus.version?.name_clean || 'N/A' }}</td>
              </tr>
              <tr>
                <td class="font-bold">Players:</td>
                <td>
                  <div>{{ serverStatus.players ? `${serverStatus.players.online} / ${serverStatus.players.max}` : 'N/A' }}</div>
                  <button @click="togglePlayers" class="btn btn-info btn-sm mt-2">Toggle Player List</button>
                  <ul v-if="showPlayers && serverStatus.players?.list?.length" class="list-disc list-inside mt-2">
                    <li v-for="player in serverStatus.players.list" :key="player.uuid">
                      {{ player.name_clean }}
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="font-bold">Mods:</td>
                <td>
                  <div>{{ serverStatus.mods ? serverStatus.mods.length : 'N/A' }}</div>
                  <button @click="toggleMods" class="btn btn-info btn-sm mt-2">Toggle Mods List</button>
                  <ul v-if="showModsList && serverStatus.mods?.length" class="list-disc list-inside mt-2">
                    <li v-for="mod in serverStatus.mods" :key="mod.name">
                      {{ mod.name }} ({{ mod.version }})
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="font-bold">Plugins:</td>
                <td>
                  <div>{{ serverStatus.plugins ? serverStatus.plugins.length : 'N/A' }}</div>
                  <button @click="togglePlugins" class="btn btn-info btn-sm mt-2">Toggle Plugins List</button>
                  <ul v-if="showPluginsList && serverStatus.plugins?.length" class="list-disc list-inside mt-2">
                    <li v-for="plugin in serverStatus.plugins" :key="plugin.name">
                      {{ plugin.name }} ({{ plugin.version }})
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="font-bold">EULA Blocked:</td>
                <td>{{ serverStatus.eula_blocked !== undefined ? (serverStatus.eula_blocked ? 'Yes' : 'No') : 'N/A' }}</td>
              </tr>
              <tr>
                <td class="font-bold">Protocol Version:</td>
                <td>{{ serverStatus.version?.protocol || 'N/A' }}</td>
              </tr>
              <tr>
                <td class="font-bold">Software:</td>
                <td>{{ serverStatus.software || 'N/A' }}</td>
              </tr>
              <tr>
                <td class="font-bold">SVR Record:</td>
                <td>{{ serverStatus.srv_record ? `${serverStatus.srv_record.host}:${serverStatus.srv_record.port}` : 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
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
import { ref, onMounted } from 'vue';
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
    window.Telegram.WebApp.close();
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
</style>