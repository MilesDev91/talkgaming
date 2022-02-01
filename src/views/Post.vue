<template>
  <u-post :post="post"></u-post>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Post",
  setup() {
    const route = useRoute();
    const store = useStore();

    const post = computed(() => {
      store.dispatch("getPostById", route.params.id);
      return store.state.posts;
    });

    return { post };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.post-container {
  background-color: $forum-contents-background-color;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  justify-content: center;
  margin: 1rem auto;
  width: 80%;
  overflow: visible;
  border-top: 2px solid $post-border;
  border-bottom: 2px solid $post-border;
}

@media (min-width: 500px) {
  .post-container {
    width: 60%;
  }
}
</style>
