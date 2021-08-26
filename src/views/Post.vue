<template>
  <div class="post">
    {{ title }}
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const title = route.params.title;

    return { title };
  },
};
</script>

<style lang="scss" scoped>
.post {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  width: 100%;
  overflow: hidden;
}

.title {
  border-bottom: 1px solid gray;
  margin: 0.1rem auto;
  width: 100%;
  display: flex;
}

.title h4 {
  padding: 0.2rem;
  margin: 0;
}

.title-label {
  border-right: 1px solid gray;
}

h4.go-to {
  margin-left: auto;
}

.content {
  background-color: rgb(226, 224, 224);
  height: 2.5rem;
  text-align: start;
  padding: 0.1rem 0.2rem;
  margin: 0;
  position: relative;
}
</style>