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
      let posts = store.state.posts;
      let post;
      for (var key in posts) {
        if (posts[key].id == route.params.id) {
          post = posts[key];
        }
      }
      return post;
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