import { createStore } from "vuex";

// Setup firestore database reference
import {
  doc,
  where,
  query,
  onSnapshot,
  collection,
  getDocs,
  addDoc,
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
    getPostsByCategory({ commit }, category) {
      const postsQuery = query(
        collection(database, "posts"),
        where("category", "==", category)
      );
      onSnapshot(postsQuery, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          let post = {
            ...doc.data(),
            id: doc.id,
          };
          posts.push(post);
        });
        commit("setPosts", posts);
      });
    },
    getPostById({ commit }, id) {
      onSnapshot(doc(database, "posts", id), (doc) => {
        let post = {
          ...doc.data(),
          id,
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
    async createPost({ commit }, data) {
      var id;
      const post = {
        category: data.category,
        content: data.content,
        title: data.title,
        userid: data.userid,
      };
      await addDoc(collection(database, "posts"), post).then((res) => {
        commit("addPost", post);
        id = res.id;
      });
      return id;
    },
  },
  modules: {},
});
