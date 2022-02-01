<template>
  <div class="category-container">
    <h2>Posts for {{ category }} games</h2>
    <button @click="routeTo()" class="create-post-button">+ New Post</button>
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

    store.dispatch("getPostsByCategory", category);

    const filteredPosts = computed(() => {
      return store.state.posts;
    });

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

    const routeTo = () => {
      router.push({ name: "CreatePost" });
    };

    return {
      filteredPosts,
      category,
      goToPost,
      routeTo,
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

.create-post-button {
  position: sticky;
  background-color: $primary-button;
}

@media (min-width: 500px) {
  .posts-container {
    max-width: 60%;
  }
}

.post {
  border-top: 2px solid $post-border;
}

.post:last-child {
  border-bottom: 2px solid $post-border;
}
</style>
