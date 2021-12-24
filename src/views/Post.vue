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
  border: 1px solid black;
  border-radius: 0.4rem;
  justify-content: center;
  margin: 1rem auto;
  width: 80%;
  overflow: visible;
}

@media (min-width: 500px) {
  .post-container {
    width: 60%;
  }
}

.post {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  max-width: 80%;
  overflow: hidden;
}
</style>