<template>
  <div :style="{ width }" class="page-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: String,
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
