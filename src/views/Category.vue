<template>
  <u-page-container :width="windowWidth > 600 ? '60%' : '90%'">
    <h2 class="category-header">Posts for {{ category }} games</h2>
    <!-- TODO: Move create post button to menubar -->
    <u-create-post-button @route-to="routeTo()" />
    <u-post-menubar />
    <div class="posts-container">
      <div class="post" v-for="post in filteredPosts" :key="post.id">
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
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useState } from "@/maphelpers";

export default {
  name: "Category",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const category = computed(() => {
      return route.params.category;
    });

    const getPosts = () => {
      if (route.params.category)
        store.dispatch("getPostsByCategory", category.value);
    };

    const filteredPosts = computed(() => store.state.posts);
    const { windowWidth } = useState(["windowWidth"]);

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
    watch(category, getPosts);

    return {
      filteredPosts,
      category,
      goToPost,
      routeTo,
      windowWidth,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.category-header {
  text-align: center;
}

.posts-container {
  flex-direction: column;
  width: 100%;
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
