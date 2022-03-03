// Firebase initialization
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDeY4ERVmHTigYU4UUb_xletCptx14tCSI",
  authDomain: "talk-gaming.firebaseapp.com",
  projectId: "talk-gaming",
  storageBucket: "talk-gaming.appspot.com",
  messagingSenderId: "805516133596",
  appId: "1:805516133596:web:0829b15fc1931fc833a019",
  measurementId: "G-SPQL9KXK54",
});
export const database = getFirestore(firebaseApp);

import "@babel/polyfill";
import "mutationobserver-shim";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import header from "./components/shared/header.vue";
import post from "./components/post.vue";
import comment from "./components/comment.vue";
import userForm from "./components/userForm.vue";
import commentForm from "./components/commentForm.vue";
import alert from "./components/alert.vue";
import breadcrumbs from "./components/shared/breadcrumbs.vue";

let app;
onAuthStateChanged(getAuth(), () => {
  if (!app) {
    app = createApp(App);
    app.component("u-header", header);
    app.component("u-post", post);
    app.component("u-comment", comment);
    app.component("u-user-form", userForm);
    app.component("u-comment-form", commentForm);
    app.component("u-alert", alert);
    app.component("u-breadcrumbs", breadcrumbs);

    app
      .use(store)
      .use(router)
      .mount("#app");
  }
});
