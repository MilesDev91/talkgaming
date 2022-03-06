<template>
  <h2>{{ comment.author }}</h2>
  <div>{{ comment.content }}</div>
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
