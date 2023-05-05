import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/Starterview.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isAuth().then(result => {
      if(result) {
        next();
      } else {
        next({ name: 'start' });
      }
    })){
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

async function isAuth() {
  //   fetch("https://otto-backend.onrender.com/api/driver/create", {
    let x = await fetch("http://localhost:3000/api/driver/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          token: localStorage.getItem("token"),
      }),
    });
    const data = await x.json();
    if (data.status == "success") {
      return true;
    } else {
      return false;
    }
  }

export default router
