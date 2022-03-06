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
  Timestamp,
} from "firebase/firestore";
import { database } from "@/main";

export default createStore({
  // TODO: Modularize store
  state: {
    // TODO: Manage games in database
    categories: [],
    posts: [],
    comments: [],
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
    setComments(state, comments) {
      state.comments = comments;
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
            created: Timestamp.now(),
          };
          posts.push(post);
        }
        commit("setPosts", posts);
      });
    },
    async getPostById({ commit }, id) {
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
    async getComments({ commit }, postId) {
      const q = query(
        collection(database, "comments"),
        where("postId", "==", postId)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        let comments = [];
        querySnapshot.forEach((document) => {
          comments.push(document.data());
        });
        for (let comment of comments) {
          let author = await getDoc(doc(database, "users", comment.author));
          comment.author = author.data().username;
        }
        commit("setComments", comments);
      });

      return unsubscribe;
    },
  },
  modules: {},
});
