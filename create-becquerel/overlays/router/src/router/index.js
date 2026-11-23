import { createRouter, createWebHistory } from 'vue-router'
import PageHelloWorld from '../pages/hello-world.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'hello-world',
      component: PageHelloWorld
    }
  ]
})

export default router
