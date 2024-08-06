<template>
    <div class="mt-6">
      <h2 class="text-xl sm:text-2xl font-bold mb-4">{{ $t('serverStatusPage.serverStatus') }}</h2>
      <div class="card w-full bg-gray-800 shadow-xl text-white">
        <div class="card-body">
          <ServerStatusItem v-for="(item, index) in statusItems" :key="index" :title="item.title" :content="item.content" :html="item.html" />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  
  interface ServerStatus {
    online?: boolean;
    host?: string;
    ip_address?: string;
    port?: string;
    icon?: string;
    motd?: { html?: string };
    version?: { name_html?: string, name_clean?: string, protocol?: string };
    players?: { online?: number, max?: number, list?: Array<{ name_html: string, uuid: string }> };
    mods?: Array<{ name: string, version: string }>;
    plugins?: Array<{ name: string, version: string }>;
    eula_blocked?: boolean;
    software?: string;
    srv_record?: { host: string, port: string };
  }
  
  const props = defineProps<{ status: ServerStatus }>();
  
  const statusItems = computed(() => {
    const status = props.status;
    return [
      { title: 'serverStatusPage.status', content: status.online ? $t('serverStatusPage.online') : $t('serverStatusPage.offline'), html: false },
      { title: 'serverStatusPage.host', content: status.host || 'N/A', html: false },
      { title: 'serverStatusPage.ipAddress', content: status.ip_address ? `${status.ip_address}:${status.port}` : 'N/A', html: false },
      { title: 'serverStatusPage.icon', content: `<img src="${status.icon || 'N/A'}" alt="Server Icon" class="w-16 h-16" />`, html: true },
      { title: 'serverStatusPage.motd', content: status.motd?.html || 'N/A', html: true },
      { title: 'serverStatusPage.version', content: status.version?.name_html || status.version?.name_clean || 'N/A', html: true },
      { title: 'serverStatusPage.players', content: status.players ? `${status.players.online} / ${status.players.max}` : 'N/A', html: false },
      { title: 'serverStatusPage.mods', content: status.mods ? status.mods.length : 'N/A', html: false },
      { title: 'serverStatusPage.plugins', content: status.plugins ? status.plugins.length : 'N/A', html: false },
      { title: 'serverStatusPage.eulaBlocked', content: status.eula_blocked !== undefined ? (status.eula_blocked ? 'Yes' : 'No') : 'N/A', html: false },
      { title: 'serverStatusPage.protocolVersion', content: status.version?.protocol || 'N/A', html: false },
      { title: 'serverStatusPage.software', content: status.software || 'N/A', html: false },
      { title: 'serverStatusPage.srvRecord', content: status.srv_record ? `${status.srv_record.host}:${status.srv_record.port}` : 'N/A', html: false },
    ];
  });
  </script>
  
  <style scoped>
  .card-body {
    background-color: #2d3748;
  }
  </style>  