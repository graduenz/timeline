import Vue from 'vue';
import VueRouter from 'vue-router';

import session from '@/services/session';

import Home from '../views/Home.vue';
import TimelineView from '../views/TimelineView.vue';
import Account from '../views/Account.vue';
import Timelines from '../views/Timelines.vue';
import Timeline from '../views/Timeline.vue';
import Unauthorized from '../views/Unauthorized.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/t/:alias',
    name: 'TimelineView',
    component: TimelineView,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/timelines',
    name: 'Timelines',
    component: Timelines,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/timeline/:id',
    name: 'Timeline',
    component: Timeline,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "*",
    redirect: "/not-found"
  },
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import( ;;;webpackChunkName: "about";;;  '../views/About.vue')
  }*/
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!session.hasUser()) {
      next({
        path: '/',
      })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;
