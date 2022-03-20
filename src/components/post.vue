<template>
  <u-prime-panel>
    <template @click="$emit('goToRoute')" #header>
      <span @click="$emit('goToRoute')">{{ title }}</span>
    </template>
    <p v-if="!isGrouped" class="content content-alone">{{ content }}</p>
    <p v-else class="content">by: {{ author }}</p>
  </u-prime-panel>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    post: {
      title: String,
      content: String,
      author: String,
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
    const author = computed(() => {
      return props.post.author;
    });
    const isGrouped = computed(() => {
      return props.grouped;
    });
    return { title, content, isGrouped, author };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.content {
  margin: 0;
}

.content-alone {
  min-height: 5rem;
  margin-bottom: 1rem;
}
</style>
