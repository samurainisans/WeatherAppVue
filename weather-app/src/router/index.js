import { createRouter, createWebHistory } from 'vue-router'
import WeatherWidget from '/src/components/WeatherWidget.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: WeatherWidget,
      alias: '/'
    }
  ]
})
