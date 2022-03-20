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
import PrimeVue from "primevue/config";
import Breadcrumb from "primevue/breadcrumb";
import Divider from "primevue/divider";
import Button from "primevue/button";
import Panel from "primevue/panel";
import Menubar from "primevue/menubar";
import router from "./router";
import store from "./store";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import header from "./components/shared/TheHeader.vue";
import post from "./components/Post.vue";
import comment from "./components/Comment.vue";
import userForm from "./components/UserForm.vue";
import commentForm from "./components/CommentForm.vue";
import alert from "./components/Alert.vue";
import breadcrumbs from "./components/shared/TheBreadcrumbs.vue";
import createPostButton from "./components/CreatePostButton.vue";
import postMenubar from "./components/PostsMenubar.vue";
import pageContainer from "./components/PageContainer.vue";
import "primeicons/primeicons.css";
import "primevue/resources/themes/md-dark-indigo/theme.css";

let app;
onAuthStateChanged(getAuth(), () => {
  if (!app) {
    app = createApp(App);
    app.use(PrimeVue);

    app.component("u-prime-divider", Divider);
    app.component("u-prime-breadcrumb", Breadcrumb);
    app.component("u-prime-button", Button);
    app.component("u-prime-panel", Panel);
    app.component("u-prime-menubar", Menubar);

    app.component("u-breadcrumbs", breadcrumbs);
    app.component("u-create-post-button", createPostButton);
    app.component("u-header", header);
    app.component("u-post", post);
    app.component("u-comment", comment);
    app.component("u-user-form", userForm);
    app.component("u-comment-form", commentForm);
    app.component("u-post-menubar", postMenubar);
    app.component("u-alert", alert);
    app.component("u-page-container", pageContainer);

    app
      .use(store)
      .use(router)
      .mount("#app");
  }
});
