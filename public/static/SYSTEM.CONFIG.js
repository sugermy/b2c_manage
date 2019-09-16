// current use server
const ACTIVE_SERVER = 'localhost'
// all servers
const ALL_SERVERS = {
  // 1-1. online
  official: {
    apiServer: 'http://b2cservice.core.x-jing.com/official/',
  },
  // 1-2. test
  localhost: {
    apiServer: 'http://192.168.33.154:8025/official/',
  },
}

window.SYSTEM_CONFIG = {
  webServer: ALL_SERVERS[ACTIVE_SERVER]['apiServer'],
}
