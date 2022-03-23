<template>
  <u-prime-panel :class="[!isGrouped ? 'post-panel' : 'post-panel-grouped']">
    <template @click="$emit('goToRoute')" class="post-panel" #header>
      <span class="post-panel-header" @click="goToPost(post)">{{ title }}</span>
    </template>
    <p v-if="!isGrouped" class="content">{{ content }}</p>
    <p v-else class="content-grouped">by: {{ author }}</p>
  </u-prime-panel>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";

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
    const router = useRouter();

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

    function goToPost(post) {
      router.push({
        name: "Post",
        params: {
          title: post.title,
          category: post.category,
          id: post.id,
        },
      });
    }
    return { title, content, isGrouped, author, goToPost };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.content-grouped {
  margin: 0;
}

.content {
  min-height: 5rem;
  margin-bottom: 1rem;
}

.post-panel-header:hover {
  cursor: pointer;
}
</style>
