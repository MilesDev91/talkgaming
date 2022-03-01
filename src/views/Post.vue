<template>
  <u-post :post="post" />
  <button @click="commentFormVisible = !commentFormVisible">+ Comment</button>
  <u-comment-form
    @create-comment="createComment(comment)"
    :isVisible="commentFormVisible"
  />
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { firebaseCreateComment } from "../helpers/firebase";

export default {
  name: "Post",
  setup() {
    const route = useRoute();
    const store = useStore();

    const post = computed(() => {
      store.dispatch("getPostById", route.params.id);
      return store.state.posts;
    });

    const createComment = async (commentText) => {
      const user = getAuth().currentUser;

      const comment = {
        postId: this.post.id,
        author: user.uid,
        content: commentText,
        created: Timestamp.now(),
        parentId: null,
      };

      firebaseCreateComment(comment);
    };

    const commentFormVisible = false;

    return {
      post,
      commentFormVisible,
      createComment,
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
