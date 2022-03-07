<template>
  <u-page-container width="60%">
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
  </u-page-container>
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

.posts-container {
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  overflow: hidden;
}

.create-post-button {
  position: sticky;
  background-color: $primary-button;
  width: 150px;
  align-self: center;
}

.post {
  border-top: 2px solid $post-border;
}

.post:last-child {
  border-bottom: 2px solid $post-border;
}
</style>
