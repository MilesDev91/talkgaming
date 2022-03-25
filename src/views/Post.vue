<template>
  <u-page-container width="80%">
    <u-post :post="post" />
    <u-prime-button
      icon="pi pi-comment"
      class="comment-form-button"
      @click="toggleCommentForm()"
      label="Comment"
    />
    <u-comment-form
      @create-comment="createComment"
      :isVisible="commentFormVisible"
    />
    <p>comments ({{ commentCount }})</p>
    <div
      class="comment-section"
      v-for="comment in commentTree"
      :key="comment.id"
    >
      <u-comment :comment="comment" :depth="1" />
    </div>
  </u-page-container>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onUnmounted, ref, watch } from "vue";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { firebaseCreateComment } from "../helpers/firebase";
import { generateCommentTree } from "../helpers/generateCommentTree";

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
        console.log(post.value);
      }
    );

    const comments = computed(() => {
      return store.state.comments;
    });

    const commentCount = computed(() => {
      return store.state.comments.length;
    });

    const commentTree = computed(() => {
      return generateCommentTree(comments.value);
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

    onUnmounted(() => {
      store.commit("resetListeners");
    });

    return {
      post,
      commentFormVisible,
      createComment,
      toggleCommentForm,
      comments,
      commentCount,
      commentTree,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.comment-form-button {
  width: 130px;
  font-size: 0.8rem;
  margin: 0 0 1rem 0;
}

.comment-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
