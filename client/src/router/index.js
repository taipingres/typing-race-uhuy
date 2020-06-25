import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Playroom from '../views/Playroom.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/play-room',
    name: 'Playroom',
    component: Playroom,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
