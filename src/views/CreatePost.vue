<template>
  <h1>Create a new post</h1>
  <form @submit.prevent class="create-post-form">
    <input type="text" name="title" placeholder="Title" v-model="input.title" />
    <textarea
      placeholder="Type your post here"
      name="content"
      cols="30"
      rows="10"
      v-model="input.content"
    ></textarea>
    <button @keyup.enter="createPost()" type="submit" @click="createPost()">
      Submit
    </button>
  </form>
</template>

<script>
import { getAuth } from "@firebase/auth";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "CreatePost",
  setup() {
    var input = { title: "", content: "" };
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const createPost = async () => {
      const user = getAuth().currentUser;
      store
        .dispatch("createPost", {
          title: input.title,
          content: input.content,
          userid: user.uid,
          category: route.params.category,
        })
        .then((id) => {
          router.push({
            name: "Post",
            params: {
              title: input.title,
              category: route.params.category,
              id,
            },
          });
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $text-color;
}

input {
  width: 80%;
  margin: 1rem auto;
}

textarea {
  width: 80%;
  margin: auto;
}

button {
  width: 100px;
  margin: 1rem auto;
  background-color: $primary-button;
}
</style>
