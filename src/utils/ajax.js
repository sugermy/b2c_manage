import axios from "axios";
import { Promise } from "q";
import { Notification } from "element-ui";
import qs from "qs";
const baseURL = window.SYSTEM_CONFIG.webServer; //基础服务地址
export default class Ajax {
  /**
   * @param { String } baseURL        基础请求地址
   * @param { String } Token   通行凭证token
   * @param { Number } TIMEOUT        超时时间
   * @param { String } MerchantCode  商户号
   */
  constructor(Token = "", MerchantCode = "", TIMEOUT = 60000) {
    // 创建一个新的axios实例，并设置默认请求地址和请求头
    this._axios = axios.create({
      baseURL,
      TIMEOUT,
      params: {
        MerchantCode: MerchantCode
      },
      headers: { Token }
    });
    this._axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        Notification({
          title: "网络请求失败",
          message: "请检查网络请求是否配置正确",
          type: "error",
          showClose: false
        });
        return Promise.reject(error);
      }
    );
    this._axios.interceptors.response.use(
      response => {
        if (response.data) {
          let config = response.config
          if (response.data.Code == 2 && response.data.Content.indexOf('Token已失效') != -1) {
            this._axios.get('Token', {}).then(res => {
              config.headers.Token = res.Data;
              return this._axios(config)
            })
          } else {
            return response.data;
          }
        } else {
          return response;
        }
      },
      error => {
        Notification({
          title: "网络响应失败",
          message: "请检查网络请求是否配置正确",
          type: "error"
        });
        return Promise.reject(error);
      }
    );
  }
  // 请求方式优化
  get (url, params = {}) {
    return this._axios({ method: "get", url, params });
  }
  post (url, data = {}, params = {}) {
    data = qs.stringify(data);
    return this._axios({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      url,
      data,
      params
    });
  }
}
