import {routerList,demoList} from './handleRouter';
import Vue from 'vue/dist/vue.esm';
import VueRouter from 'vue-router';
import bus from '@/js/eventbus.js';
import NotFoundPage from '@/pages/notFound.vue';
// 解决重复点击路由报错的BUG

Vue.use(VueRouter);
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const defaultRoute = {
  path: '/',
  redirect: { name: demoList[1] }
};

const nfpRoute = {
  path: '/404',
  component: NotFoundPage
};

const unexistRouter = {
  path: '*',
  component: NotFoundPage
};

const routes = [defaultRoute, ...routerList, nfpRoute, unexistRouter];


const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name && demoList.indexOf(to.name) > -1) {
    bus.$emit('setBoxes', to.name);
  } else if (to.name) {
    router.push({ path: '/404' });
  }
  next();
});

window.router = router;
export default router;
