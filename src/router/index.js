import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import DetailHp from '../views/DetailHp.vue'
import ListHpView from '../views/ListHpView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CheckoutView from '../views/CheckoutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/home"      
  },
  {
    path: '/home',
    name: 'home',
    component:HomeView      
  },
  {
    path: '/login',
    name: 'login',
    component:LoginView      
  },
  {
    path: '/register',
    name: 'register',
    component:RegisterView      
  },
  {
    path: '/home/:list',
    name: 'list',
    component:ListHpView      
  },
  {
    path: '/home/:list/:detail',
    name: 'detail',
    component:DetailHp      
  },
  
  // {
  //   path: '/:list',
  //   name: 'list',
  //   component: ListHpView
  // },
  // {
  //   path: '/:list/:detail',
  //   name: 'detail',
  //   component: DetailHp
  // },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
 
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView
  },
 
 
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
