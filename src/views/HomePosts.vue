<template>
  <u-page-container :width="windowWidth > 600 ? '60%' : '90%'">
    <div class="welcome-header">
      <img
        class="controller-icon"
        src="../assets/images/game_icon-0-0.png"
        alt="half of a gaming controller"
      />
      <h2 class="welcome-title">Welcome to TalkGaming!</h2>
      <img
        class="controller-icon"
        src="../assets/images/game_icon-1-0.png"
        alt="half of a gaming controller"
      />
    </div>
    <u-post-menubar />
    <u-post-list :posts="topPosts" />
  </u-page-container>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useState } from "../maphelpers";

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
    const { windowWidth } = useState(["windowWidth"]);

    const routeTo = () => {
      router.push({ name: "CreatePost" });
    };

    getPosts();

    onUnmounted(() => {
      store.commit("resetListeners");
    });

    return {
      topPosts,
      routeTo,
      windowWidth,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.welcome-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.welcome-title {
  text-align: center;
  display: inline;
  margin: 0 1rem;
}

.controller-icon {
  width: 40px;
}
</style>
