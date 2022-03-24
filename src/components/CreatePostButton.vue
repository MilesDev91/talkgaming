<template>
  <u-prime-button
    class="create-post-button"
    icon="pi pi-pencil"
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
  margin-bottom: 1rem;
}
</style>
