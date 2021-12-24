import { createStore } from 'vuex'

// Setup firestore database reference
import { initializeApp } from 'firebase/app'
import { doc, where, getFirestore, query, onSnapshot, collection, getDocs } from 'firebase/firestore'
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDeY4ERVmHTigYU4UUb_xletCptx14tCSI",
  authDomain: "talk-gaming.firebaseapp.com",
  projectId: "talk-gaming",
  storageBucket: "talk-gaming.appspot.com",
  messagingSenderId: "805516133596",
  appId: "1:805516133596:web:0829b15fc1931fc833a019",
  measurementId: "G-SPQL9KXK54"
})
export const database = getFirestore(firebaseApp);

export default createStore({
  // TODO: Modularize store
  state: {
    // TODO: Manage games in database
    categories: [],
    posts: []
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
    setCategories (state, categories) {
      state.categories = categories
    }
  },
  actions: {
    // Gets multiple posts in category from database
    getPostsByCategory ({ commit }, category) {
      const postsQuery = query(collection(database, "posts"), where("category", "==", category))
      onSnapshot(postsQuery, (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((doc) => {
          // We have to document id for reference reasons
          let post = {
            ...doc.data(),
            id: doc.id
          };
          posts.push(post)
        })
        commit("setPosts", posts)
      })
    },
    // Gets a single post by id from database
    getPostById ({ commit }, id) {
      onSnapshot(doc(database, "posts", id), (doc) => {
        let post = {
          ...doc.data(),
          id
        }
        commit("setPosts", post)
      })
    },
    // Gets our categories from database
    async getCategories ({ commit }) {
      const categoriesSnapshot = await getDocs(collection(database, "categories"))
      let categories = []
      categoriesSnapshot.forEach((doc) => {
        let category = doc.data()
        categories.push(category)
      })
      commit("setCategories", categories)
    }
  },
  modules: {
  }
})
