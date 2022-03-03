<template>
  <u-post :post="post" />
  <button @click="toggleCommentForm()">+ Comment</button>
  <u-comment-form
    @create-comment="createComment"
    :isVisible="commentFormVisible"
  />
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { firebaseCreateComment } from "../helpers/firebase";

export default {
  name: "Post",
  setup() {
    const route = useRoute();
    const store = useStore();
    const user = getAuth().currentUser;

    const post = computed(() => {
      store.dispatch("getPostById", route.params.id);
      return store.state.posts;
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

button {
  width: 100px;
  font-size: 0.8rem;
  margin: 0 auto 1rem auto;
}

.post-container {
  background-color: $forum-contents-background-color;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  justify-content: center;
  margin: 1rem auto;
  width: 80%;
  overflow: visible;
  border-top: 2px solid $post-border;
  border-bottom: 2px solid $post-border;
}

@media (min-width: 500px) {
  .post-container {
    width: 60%;
  }
}
</style>
