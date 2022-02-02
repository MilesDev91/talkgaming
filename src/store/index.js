import { createStore } from "vuex";

// Setup firestore database reference
import {
  doc,
  where,
  query,
  onSnapshot,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { database } from "@/main";

export default createStore({
  // TODO: Modularize store
  state: {
    // TODO: Manage games in database
    categories: [],
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    addPost(state, post) {
      state.posts.push(post);
    },
  },
  actions: {
    async getPostsByCategory({ commit }, category) {
      commit("setPosts", []);
      const postsQuery = query(
        collection(database, "posts"),
        where("category", "==", category)
      );
      onSnapshot(postsQuery, async (querySnapshot) => {
        let posts = [];
        for (const snapshot of querySnapshot.docs) {
          let user = await getDoc(
            doc(database, "users", snapshot.data().userid)
          );
          let post = {
            ...snapshot.data(),
            id: snapshot.id,
            author: user.data().username,
          };
          posts.push(post);
        }
        commit("setPosts", posts);
      });
    },
    getPostById({ commit }, id) {
      onSnapshot(doc(database, "posts", id), async (snapshot) => {
        let user = await getDoc(doc(database, "users", snapshot.data().userid));
        let post = {
          ...snapshot.data(),
          id,
          author: user.data().username,
        };
        commit("setPosts", post);
      });
    },
    async getCategories({ commit }) {
      const categoriesSnapshot = await getDocs(
        collection(database, "categories")
      );
      let categories = [];
      categoriesSnapshot.forEach((doc) => {
        let category = doc.data();
        categories.push(category);
      });
      commit("setCategories", categories);
    },
  },
  modules: {},
});
