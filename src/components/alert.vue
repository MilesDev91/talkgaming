<template>
  <p class="alert">
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.alert {
  background-color: rgb(69, 184, 69);
  margin-top: 1rem;
  margin-bottom: 0;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: $nav-text-color;
  font-size: 1.2rem;
}
</style>