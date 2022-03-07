<template>
  <div class="comment">
    <h2 class="comment-title">- {{ comment.author }}</h2>
    <!-- TODO: Format and display date -->
    <div class="comment-creation">{{ comment.created }}</div>
    <div>{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      postId: String,
      parentId: String,
      author: String,
      created: Date,
      content: String,
    },
  },
  setup(props) {
    return props;
  },
};
</script>

<style scoped>
.comment {
  margin-bottom: 1rem;
  min-width: 200px;
  text-align: left;
}

.comment-title {
  margin-left: 0;
}

.comment-creation {
  float: right;
}
</style>
