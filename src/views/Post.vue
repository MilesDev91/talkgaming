<template>
  <u-page-container width="80%">
    <u-post :post="post" />
    <button class="comment-form-button" @click="toggleCommentForm()">
      + Comment
    </button>
    <u-comment-form
      @create-comment="createComment"
      :isVisible="commentFormVisible"
    />
    <div class="comment-section" v-for="comment in comments" :key="comment.id">
      <u-comment :comment="comment" />
    </div>
  </u-page-container>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { firebaseCreateComment } from "../helpers/firebase";

export default {
  name: "Post",
  setup() {
    const route = useRoute();
    const store = useStore();
    const user = getAuth().currentUser;

    store.dispatch("getPostById", route.params.id);

    const post = computed(() => {
      return store.state.posts;
    });

    watch(
      () => store.state.posts,
      () => {
        store.dispatch("getComments", post.value.id);
      }
    );

    const comments = computed(() => {
      return store.state.comments;
    });

    const createComment = async (commentText) => {
      const comment = {
        postId: post.value.id,
        author: user.uid,
        content: commentText,
        created: Timestamp.now(),
        parentId: null,
      };

      firebaseCreateComment(comment)
        .then((res) => alert(res))
        .catch((error) => console.error(error));

      commentFormVisible.value = !commentFormVisible.value;
    };

    const commentFormVisible = ref(false);

    const toggleCommentForm = () => {
      if (user) {
        commentFormVisible.value = !commentFormVisible.value;
      } else {
        alert("You must log in to leave a comment");
      }
    };

    return {
      post,
      commentFormVisible,
      createComment,
      toggleCommentForm,
      comments,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.comment-form-button {
  width: 100px;
  font-size: 0.8rem;
  margin: 0 auto 1rem auto;
}

.comment-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
