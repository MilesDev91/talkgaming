<template>
  <u-page-container width="80%">
    <h1>Create a new post</h1>
    <form @submit.prevent class="create-post-form">
      <input
        type="text"
        name="title"
        placeholder="Title"
        v-model="input.title"
        class="post-title"
      />
      <textarea
        placeholder="Type your post here"
        name="content"
        cols="30"
        rows="10"
        v-model="input.content"
        class="post-content"
      ></textarea>
      <u-prime-button
        class="post-submit-button"
        @keyup.enter="createPost()"
        type="submit"
        @click="createPost()"
        label="Submit"
      />
    </form>
  </u-page-container>
</template>

<script>
import { getAuth } from "@firebase/auth";
import { useRoute, useRouter } from "vue-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "@/main";

export default {
  name: "CreatePost",
  setup() {
    var input = { title: "", content: "" };
    const route = useRoute();
    const router = useRouter();

    const createPost = async () => {
      const user = getAuth().currentUser;
      let id;
      const post = {
        category: route.params.category,
        content: input.content,
        title: input.title,
        userid: user.uid,
        commentCount: 0,
        created: Timestamp.now(),
      };
      await addDoc(collection(database, "posts"), post).then((res) => {
        id = res.id;
      });
      router.push({
        name: "Post",
        params: {
          title: input.title,
          category: route.params.category,
          id,
        },
      });
    };

    return {
      createPost,
      input,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.create-post-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $text-color;
}

.post-title {
  width: 80%;
  margin: 1rem auto;
}

.post-content {
  width: 80%;
  margin: auto;
}

.post-submit-button {
  width: 100px;
  margin: 1rem auto;
}
</style>
