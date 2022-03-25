<template>
  <u-prime-panel
    :class="[depth % 2 == 0 ? 'alternate-comment comment' : 'comment']"
  >
    <template #header>
      <h2 class="comment-title">- {{ comment.author }} - {{ creationDate }}</h2>
    </template>
    <p class="comment-content">{{ comment.content }}</p>
    <u-prime-button
      icon="pi pi-reply"
      class="comment-reply-button"
      @click="toggleCommentForm"
    />
    <u-comment-form
      :isVisible="commentFormVisible"
      @create-comment="createCommentReply"
    />
    <u-comment
      v-for="childComment in comment.children"
      :key="childComment.id"
      :comment="childComment"
      :depth="depth + 1"
    />
  </u-prime-panel>
</template>

<script>
import { computed, ref } from "vue";
import moment from "moment";
import { getAuth } from "firebase/auth";
import { firebaseCreateComment } from "../helpers/firebase";
import { Timestamp } from "firebase/firestore";

export default {
  props: {
    comment: {
      postId: String,
      parentId: String,
      author: String,
      created: Date,
      content: String,
      children: Array,
      id: String,
    },
    depth: Number,
  },
  setup(props) {
    const user = getAuth().currentUser;

    const creationDate = computed(() => {
      return moment(props.comment.created.milliseconds).format("MMM D YY");
    });

    const commentFormVisible = ref(false);

    const toggleCommentForm = () => {
      if (user) {
        commentFormVisible.value = !commentFormVisible.value;
      } else {
        alert("You must log in to leave a comment");
      }
    };

    const createCommentReply = async (commentText) => {
      const comment = {
        postId: props.comment.postId,
        author: user.uid,
        content: commentText,
        created: Timestamp.now(),
        parentId: props.comment.id,
      };

      firebaseCreateComment(comment)
        .then((res) => alert(res))
        .catch((error) => console.error(error));

      commentFormVisible.value = !commentFormVisible.value;
    };

    return {
      props,
      creationDate,
      toggleCommentForm,
      commentFormVisible,
      createCommentReply,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.comment {
  margin-top: 1rem;
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

.comment-reply-button {
  background-color: transparent;
  color: inherit;
  width: 20px;
  height: 20px;
  margin-top: 1rem;
}

.comment-reply-button:hover {
  background-color: transparent;
}

.comment-reply-button:focus {
  background-color: transparent;
  color: orange;
}
</style>
