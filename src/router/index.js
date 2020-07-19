import Vue from 'vue'
import VueRouter from 'vue-router'
import api from '../components/api.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/api' },
  { path: '/api', component: api }
]

const router = new VueRouter({
  routes
})

export default router
