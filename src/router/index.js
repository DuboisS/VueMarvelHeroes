import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import HeroeDetails from '../views/HeroeDetails.vue';
import ListHeroes from '../views/ListHeroes.vue';
import Team from '../views/Team.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/heroes',
    name: 'ListHeroes',
    component: ListHeroes,
  },
  {
    path: '/heroes/:id',
    name: 'HeroeDetails',
    component: HeroeDetails,
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
