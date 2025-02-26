import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store'
import 'nprogress/nprogress.css'

// createApp(App).use(store).use(router).mount('#app')
// const GStore = reactive({ flashMessage: '' })
createApp(App).use(router).provide('GStore', GStore).mount('#app')
