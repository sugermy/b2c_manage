// current use server
const ACTIVE_SERVER = 'localhost'//当前使用的服务器
// all servers
const ALL_SERVERS = {
  // 1-1. 正式服务器
  official: {
    apiServer: 'http://b2cservice.core.x-jing.com/official/',
  },
  // 1-2. 测试服务器
  localhost: {
    apiServer: 'http://192.168.33.154:8025/official/',
  },
  //1-3. 测试本机服务
  other: {
    apiServer: 'http://192.168.33.154:61780/official/',
  },
}

window.SYSTEM_CONFIG = {
  webServer: ALL_SERVERS[ACTIVE_SERVER]['apiServer'],//启用服务器地址
  MerchantCode: 'S190304762',//商户号
  AppId: "wxbf5e0aff7a87e7bd",//公众平台授权 AppID
  AppSecret: "e5101a53ac36911e9af317c91a4be7dc",//公众平台授权 AppSecret 
  wechatUrl: 'http://fk.pay.x-jing.cn/Home/ResponseUserInfo'//微信回调地址
}
