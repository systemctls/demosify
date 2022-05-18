import '@/css/index.scss';
import Vue from 'vue/dist/vue.esm';
import store from '@/js/store';
import router from '@/js/router';
import {Tree,Input,InputNumber} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Main from '@/main.vue';

Vue.use(Tree);
Vue.use(Input);
Vue.use(InputNumber);

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

new Vue({
  render: h => h(Main),
  store,
  router
}).$mount('#app');
