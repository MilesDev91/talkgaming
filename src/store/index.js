import { createStore } from 'vuex'

// Setup firestore database reference
import { doc, where, query, onSnapshot, collection, getDocs } from 'firebase/firestore'
import { database } from '@/main';

export default createStore({
  // TODO: Modularize store
  state: {
    // TODO: Manage games in database
    categories: [],
    posts: [],
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
