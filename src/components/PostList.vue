<template>
  <div class="posts-container">
    <u-post
      class="post"
      :grouped="true"
      :post="post"
      v-for="post in posts"
      :key="post.id"
    ></u-post>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.post {
  border-radius: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}
</style>
