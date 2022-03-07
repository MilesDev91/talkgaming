<template>
  <div :style="{ width }" class="page-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
  },
  setup(props) {
    return props;
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
</style>
