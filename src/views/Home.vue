<template>
  <u-page-container width="100%">
    <div class="home">
      <template v-if="windowWidth > 600">
        <u-prime-panel header="Categories" class="categories">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category"
            @click="routeTo(category.title)"
            tabindex="0"
            @keyup.enter="routeTo(category.title)"
          >
            <div style="z-index: 2">{{ category.title }}</div>
          </div>
        </u-prime-panel>
        <u-prime-divider layout="vertical" />
      </template>
      <router-view />
    </div>
  </u-page-container>
</template>

<script>
import { useRouter } from "vue-router";
import { useState } from "@/maphelpers";
import { useStore } from "vuex";

export default {
  name: "Home",
  methods: {
    // We have to handle dynamic require statements here, because setup can't rely on template to pass in data at first.
    getPath(file) {
      return require("../assets/images/" + file);
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    store.dispatch("getCategories");

    const { categories } = useState(["categories"]);
    const { windowWidth } = useState(["windowWidth"]);

    const routeTo = (category) => {
      router.push({ name: "Category", params: { category } });
    };

    return {
      categories,
      routeTo,
      windowWidth,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.p-divider {
  color: $nav-background-color;
}

.home {
  display: flex;
}

.categories {
  margin: 0;
  margin-left: 2rem;
  width: 20%;
  background-color: #1e1e1e;
}

.category {
  display: flex;
  z-index: 2;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>
