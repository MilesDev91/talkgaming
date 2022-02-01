import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:category",
    name: "Category",
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/Category.vue"),
  },
  {
    name: "Post",
    path: "/:category/:id",
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    name: "Register",
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    name: "CreatePost",
    path: "/:category/createpost",
    component: () =>
      import(/* webpackChunkName: "createpost" */ "../views/CreatePost.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  if (to.name == "CreatePost" && !auth.currentUser) next({ name: "Login" });
  else next();
});
export default router;
