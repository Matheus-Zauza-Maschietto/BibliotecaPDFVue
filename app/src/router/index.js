import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
import Usuario from '@/services/Usuario'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: true
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requireAuth: false
    },
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/CadastroView.vue'),
    meta: {
      requireAuth: false
    },
  },
  {
    path: '/pdf/:encodedPdfName',
    name: 'pdf',
    component: () => import('../views/PdfView.vue'),
    meta: {
      requireAuth: true
    },
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/PerfilView.vue'),
    meta: {
      requireAuth: true
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requireAuth: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {

  let isAuth;
  const token = localStorage.getItem('token');
  await Usuario.checkToken(token)
  .then((response) => {
    if(response.status == 200){
      Usuario.setToken(token);
      store.commit('token', token);
      isAuth = true;
    }
    else {
      isAuth = false;
    }
  })
  .catch(() => {
    isAuth = false;
  });

  const requiresAuth = to.matched.some(p => p.meta.requireAuth)

  if (!isAuth && requiresAuth) {
    next('/login')
  }
  else {
    next()
  }
}

)


export default router
