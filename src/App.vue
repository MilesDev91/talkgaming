<template>
  <u-header></u-header>
  <u-breadcrumbs></u-breadcrumbs>
  <router-view />
</template>

<script>
import { onMounted, onUnmounted, watchEffect, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    let windowWidth = ref(window.innerWidth);

    const onWidthChange = () => (windowWidth.value = window.innerWidth);

    onMounted(() => window.addEventListener("resize", onWidthChange));
    onUnmounted(() => window.removeEventListener("resize", onWidthChange));
    const store = useStore();

    watchEffect(() => store.commit("setWindowWidth", windowWidth));
  },
};
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";
</style>
