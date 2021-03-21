import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import HeroeDetails from '../views/HeroeDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/heroes/:id',
    name: 'HeroeDetails',
    component: HeroeDetails,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
