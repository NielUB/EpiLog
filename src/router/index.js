import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../composables/useSupabase'
import Home from '../Views/Home.vue'
import Login from '../Views/Login.vue'
import Estoque from '../Views/Estoque.vue'
import Cadastro from '../Views/Cadastro.vue'
import Entregas from '../Views/Entregas.vue'
import Funcionarios from '../Views/Funcionarios.vue'
import Nave from '../Views/Nave.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/Login', component: Login },
  {
    path: '/Nave', component: Nave,
    meta: { requiresAuth: true },
    children: [
      { path: 'Estoque', component: Estoque },
      { path: 'Cadastro', component: Cadastro },
      { path: 'Entregas', component: Entregas },
      { path: 'Funcionarios', component: Funcionarios }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const { data: { session } } = await supabase.auth.getSession()
  if (requiresAuth && !session) {
    next('/Login')
  } else {
    next()
  }
})
export default router