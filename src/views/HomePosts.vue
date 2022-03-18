<template>
  <u-page-container width="60%">
    <h2 class="welcome-title">Welcome to TalkGaming!</h2>
    <div class="posts-container">
      <div class="post" v-for="post in topPosts" :key="post.id">
        <u-post
          @go-to-route="goToPost(post)"
          :grouped="true"
          :post="post"
        ></u-post>
      </div>
    </div>
  </u-page-container>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "HomePosts",
  setup() {
    const store = useStore();
    const router = useRouter();

    const getPosts = () => {
      store.dispatch("getTopPosts", { quantity: 10 });
    };

    const topPosts = computed(() => {
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

    getPosts();

    return {
      topPosts,
      goToPost,
      routeTo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.welcome-title {
  text-align: center;
}

.posts-container {
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  overflow: hidden;
}

.post {
  border-top: 2px solid $post-border;
}

.post:last-child {
  border-bottom: 2px solid $post-border;
}
</style>
