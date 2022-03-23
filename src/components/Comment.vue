<template>
  <u-prime-panel class="comment">
    <template #header>
      <h2 class="comment-title">- {{ comment.author }} - {{ creationDate }}</h2>
    </template>
    <p class="comment-content">{{ comment.content }}</p>
  </u-prime-panel>
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
  width: 100%;
  text-align: left;
}

.comment-title {
  margin: 0;
  font-size: 1rem;
}

.comment-content {
  margin: 0;
}
</style>
