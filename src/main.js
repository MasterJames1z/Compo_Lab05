import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// createApp(App).use(store).use(router).mount('#app')
const GStore = reactive({ flashMessage: '' })
createApp(App).use(store).use(router).provide('GStore', GStore).mount('#app')
