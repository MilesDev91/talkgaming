import { createStore } from 'vuex'

export default createStore({
  // TODO: Modularize store
  state: {
    // TODO: Manage categories and games in database
    categories: [
      { title: "Action", image: "action_game.jpg" },
      { title: "RPG", image: "rpg_game.jpg" },
      { title: "Adventure", image: "adventure_game.jpg" },
      { title: "Strategy", image: "strategy_game.jpg" }],

    // TODO: Manage posts in database. Base posts on users
    posts: [
      {
        title: 'Example Post',
        content: 'This is just an example post for action games!',
        category: 'Action',
        id: 0
      },
      {
        title: 'Example 2',
        content: 'This is a 2nd test post! I am making the content longer as well. This is to test content overflow. We only want to show a specific amount of content',
        category: 'Action',
        id: 1
      },
      {

        title: 'Another post?',
        content: 'Example post for some good ol RPG',
        category: 'RPG',
        id: 2

      },
      {

        title: 'Just another',
        content: 'Wanna play a strategy game together?',
        category: 'Strategy',
        id: 3

      },
      {

        title: 'Found a post did you',
        content: "Let's play an adventure game!",
        category: 'Adventure',
        id: 4

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
