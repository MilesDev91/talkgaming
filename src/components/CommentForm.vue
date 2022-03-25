<template>
  <form v-if="props.isVisible" @submit.prevent class="comment-form">
    <textarea
      name="comment"
      id="comment"
      cols="30"
      rows="10"
      v-model="input.comment"
    />
    <div>
      <u-prime-button
        type="submit"
        @click.prevent="this.$emit('create-comment', input.comment)"
        label="Submit"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    isVisible: { type: Boolean, default: false },
    postId: String,
    parentId: String,
    author: String,
    created: Date,
  },
  setup(props) {
    var input = { comment: "" };

    return {
      input,
      props,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
</style>
