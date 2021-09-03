import '@babel/polyfill'
import 'mutationobserver-shim'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



const app = createApp(App)

// Component import/registration
import header from './components/shared/header.vue'
import post from './components/post.vue'
app.component('u-header', header)
app.component('u-post', post)

// app initialization
app.use(store).use(router).mount('#app')

