<template>
  <div class="post-container">
    <div class="title">
      <button
        class="view-post-button"
        v-if="isGrouped"
        @click="$emit('goToRoute')"
      >
        View
      </button>
      <h4 @click="$emit('goToRoute')">{{ title }}</h4>
    </div>
    <p v-if="!isGrouped" class="content">{{ content }}</p>
    <p v-else class="content-grouped">{{ content }}</p>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    post: {
      title: String,
      content: String,
    },
    grouped: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const title = ref(props.post.title);
    const content = ref(props.post.content);
    const isGrouped = ref(props.grouped);
    return { title, content, isGrouped };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.post-container {
  background-color: $forum-contents-background-color;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  overflow: hidden;
}

@media (min-width: 500px) {
  .post-container {
    width: 60%;
  }
}

.post {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  max-width: 80%;
  overflow: hidden;
}

.title {
  border-bottom: 1px solid gray;
  width: 100%;
  display: flex;
  position: relative;
}

.title h4 {
  padding: 0.4rem;
  margin: 0;
}

.title h4:hover {
  cursor: pointer;
}

.content {
  background-color: rgb(226, 224, 224);
  text-align: start;
  padding: 0.4rem;
  margin: 0;
  min-height: 5rem;
}

.content-grouped {
  background-color: rgb(226, 224, 224);
  text-align: start;
  padding: 0.4rem;
  margin: 0;
  height: 2.5rem;
}

.view-post-button {
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 25%;
}

.view-post-button:hover {
  cursor: pointer;
}
</style>