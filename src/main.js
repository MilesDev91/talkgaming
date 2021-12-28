// Firebase initialization
import { initializeApp } from '@firebase/app'
import { getFirestore } from '@firebase/firestore';
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDeY4ERVmHTigYU4UUb_xletCptx14tCSI",
  authDomain: "talk-gaming.firebaseapp.com",
  projectId: "talk-gaming",
  storageBucket: "talk-gaming.appspot.com",
  messagingSenderId: "805516133596",
  appId: "1:805516133596:web:0829b15fc1931fc833a019",
  measurementId: "G-SPQL9KXK54"
})
export const database = getFirestore(firebaseApp);

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
import userForm from './components/userForm.vue'
app.component('u-header', header)
app.component('u-post', post)
app.component('u-user-form', userForm)

// app initialization
app.use(store).use(router).mount('#app')

