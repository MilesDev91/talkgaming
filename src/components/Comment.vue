<template>
  <div class="comment">
    <h2 class="comment-title">- {{ comment.author }} - {{ creationDate }}</h2>
    <div>{{ comment.content }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import moment from "moment";

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
    const creationDate = computed(() => {
      return moment(props.comment.created.milliseconds).format("MMM D YY");
    });

    return {
      props,
      creationDate,
    };
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
</style>
