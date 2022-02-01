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
      <h3 @click="$emit('goToRoute')">{{ title }}</h3>
    </div>
    <p v-if="!isGrouped" class="content content-alone">{{ content }}</p>
    <p v-else class="content content-grouped">{{ content }}</p>
  </div>
</template>

<script>
import { computed } from "vue";

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
    const title = computed(() => {
      return props.post.title;
    });
    const content = computed(() => {
      return props.post.content;
    });
    const isGrouped = computed(() => {
      return props.grouped;
    });
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
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
}

.title {
  background-color: $app-background;
  width: 100%;
  display: flex;
  position: relative;
}

.title h3 {
  padding: 0.4rem;
  margin: 0;
}

.title h4:hover {
  cursor: pointer;
}

.content {
  background-color: $post-content-color;
  text-align: start;
  padding: 0.4rem;
  margin: 0;
}

.content-alone {
  min-height: 5rem;
}

.content-grouped {
  height: 2.5rem;
}

.view-post-button {
  color: $text-color;
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 1rem;
}

.view-post-button:hover {
  cursor: pointer;
}
</style>
