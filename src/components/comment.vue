<template>
  <div>{{ comment }}</div>
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
