<template>
  <u-Button
    class="create-post-button"
    icon="pi pi-plus"
    @click="$emit('routeTo')"
    label=" New Post"
  />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.create-post-button {
  position: sticky;
  width: 150px;
  align-self: center;
}
</style>
