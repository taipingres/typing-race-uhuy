import Vue from 'vue';
import VueRouter from 'vue-router';
import Playroom from '../views/Playroom.vue';
import Room from '../views/Room.vue';
import Login from '../views/Login.vue';
import Ending from '../views/Ending.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/play-room',
    name: 'Playroom',
    meta: { requiresAuth: true },
    component: Playroom,
  },
  {
    path: '/room',
    name: 'Room',
    meta: { requiresAuth: true },
    component: Room,
  },
  {
    path: '/end',
    name: 'Ending',
    meta: { requiresAuth: true },
    component: Ending,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.isloggedin;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else if (isLoggedIn) {
    next('/room'); // make sure to always call next()!
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
