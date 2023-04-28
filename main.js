import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from 'store'
import http from './common/utils/http.js';
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$http = http.request;
// 跳转
Vue.prototype.$goJump = (url, desc='notToken') => {
	if(desc !== 'token') return uni.navigateTo({ url });
	const userid = uni.getStorageSync('userid');
	if(userid) return uni.navigateTo({ url });
	uni.navigateTo({ url: '/pages/login/login' });
}

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App, store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif