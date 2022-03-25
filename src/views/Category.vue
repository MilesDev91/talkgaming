<template>
  <u-page-container :width="windowWidth > 600 ? '60%' : '90%'">
    <h2 class="category-header">{{ category }} Games</h2>
    <!-- TODO: Move create post button to menubar -->
    <u-create-post-button @route-to="routeToCreatePost()" />
    <u-post-menubar />
    <u-post-list :posts="filteredPosts" />
  </u-page-container>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed, onUnmounted, watch } from "vue";
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

    const routeToCreatePost = () => {
      router.push({ name: "CreatePost" });
    };

    getPosts();
    watch(category, getPosts);

    onUnmounted(() => {
      store.commit("resetListeners");
    });

    return {
      filteredPosts,
      category,
      routeToCreatePost,
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
</style>
