// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store/'
import { Indicator,Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';
import filters from './filters'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

require('../static/css/base.css');

require('../static/css/index.css');

axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('ppvserver-token');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';


var instance = axios.create({
  timeout: 5000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: false
});

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
instance.interceptors.request.use(function (config) {  //配置发送请求的信息
  config.headers.Authorization = window.localStorage.getItem('ppvserver-token');
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return config;
}, function (error) {
  Indicator.close();
});

instance.interceptors.response.use(function (response) { //配置请求回来的信息
  window.localStorage.setItem('ppvserver-token',response.config.headers.Authorization);
  Indicator.close();
  return response;
}, function (error) {
  Indicator.close();
  return Promise.reject(error);
});

Vue.prototype.$http = instance

/* eslint-disable no-new */


  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
document.addEventListener('deviceready', function() {
  alert('加载完成')
  window.navigator.splashscreen.hide()
}, false);