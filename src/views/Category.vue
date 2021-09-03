<template>
  <div class="category-container">
    <h2>Posts for {{ category }} games</h2>
    <div class="posts-container">
      <div class="post" v-for="(post, index) in filteredPosts" :key="index">
        <u-post
          @go-to-route="goToPost(post)"
          :grouped="true"
          :post="post"
        ></u-post>
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

    const category = route.params.category;

    // This filters post to only those in this category. Database will be arranged differently, so this will be redone
    // TODO: do this in firebase or handle in store with firebase
    const filteredPosts = computed(() => {
      let posts = store.state.posts;
      let filteredArray = [];

      for (var key in posts) {
        if (posts[key].category == category) {
          filteredArray.push(posts[key]);
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
  margin: 1rem 0;
  display: flex;
  overflow: hidden;
}

@media (min-width: 500px) {
  .posts-container {
    max-width: 60%;
  }
}
</style>