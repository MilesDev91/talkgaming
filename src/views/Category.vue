<template>
  <div class="category-container">
    <h2>Posts for {{ category }} games</h2>
    <div class="posts-container">
      <div class="post" v-for="(post, index) in filteredPosts" :key="index">
        <div class="title">
          <h4 class="title-label">Title&nbsp;</h4>
          <h4>&nbsp;{{ post.title }}</h4>
          <h4 class="go-to" @click="goToPost(post)">Go</h4>
        </div>
        <p class="content">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Category",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const posts = store.state.posts;

    const category = route.params.category;

    // This filters post to only those in this category. Database will be arranged differently, so this will be redone
    // TODO: do this in firebase or handle in store with firebase
    const filteredPosts = computed(() => {
      let filteredArray = [];

      for (var key in posts) {
        for (var i in posts[key]) {
          if (posts[key][i].category == category) {
            filteredArray.push(posts[key][i]);
          }
        }
      }
      return filteredArray;
    });

    // Goes to specific post.
    function goToPost(post) {
      router.push({
        name: "Post",
        params: {
          title: post.title,
          category: post.category,
          id: post.id,
        },
      });
    }

    return {
      filteredPosts,
      category,
      goToPost,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.category-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
}

.posts-container {
  flex-direction: column;
  width: 80%;
  border: 1px solid black;
  border-radius: 0.4rem;
  margin: 1rem 0;
  display: flex;
  background-color: $forum-contents-background-color;
}

@media (min-width: 500px) {
  .posts-container {
    max-width: 60%;
  }
}
.post {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  width: 100%;
  overflow: hidden;
}

.post:last-child {
  border: none;
}

.title {
  border-bottom: 1px solid gray;
  margin: 0.1rem auto;
  width: 100%;
  display: flex;
}

.title h4 {
  padding: 0.2rem;
  margin: 0;
}

.title-label {
  border-right: 1px solid gray;
}

h4.go-to {
  margin-left: auto;
}

.content {
  background-color: rgb(226, 224, 224);
  height: 2.5rem;
  text-align: start;
  padding: 0.1rem 0.2rem;
  margin: 0;
  position: relative;
}
</style>