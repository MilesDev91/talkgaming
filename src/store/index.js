import { createStore } from 'vuex'

export default createStore({
  // TODO: Modularize store
  state: {
    // TODO: Manage categories and games in database
    categories: ["Action", "RPG", "Adventure", "Strategy"],

    // TODO: Manage posts in database. Base posts on users
    posts: [
      {
        0: {
          title: 'Example Post',
          content: 'This is just an example post for action games!',
          category: 'Action',
          id: 0
        }
      },
      {
        1: {
          title: 'Example 2',
          content: 'This is a 2nd test post! I am making the content longer as well. This is to test content overflow. We only want to show a specific amount of content',
          category: 'Action',
          id: 1
        }
      },
      {
        2: {
          title: 'Another post?',
          content: 'Example post for some good ol RPG',
          category: 'RPG',
          id: 2
        }
      },
      {
        3: {
          title: 'Just another',
          content: 'Wanna play a strategy game together?',
          category: 'Strategy',
          id: 3
        }
      },
      {
        4: {
          title: 'Found a post did you',
          content: "Let's play an adventure game!",
          category: 'Adventure',
          id: 4
        }
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
