import Vue from 'vue';
import VueRouter from 'vue-router';
import Room from '../views/Room.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/room',
    name: 'Room',
    meta: { requiresAuth: true },
    component: Room,
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
        path: '/login',
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
