<template>
  <u-page-container width="100%">
    <div class="home">
      <div class="categories">
        <h2>Categories</h2>
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
      </div>
      <Divider layout="vertical" />
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

    // Store mappings
    const { categories } = useState(["categories"]);

    const routeTo = (category) => {
      router.push({ name: "Category", params: { category } });
    };

    return {
      categories,
      routeTo,
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
  margin: 4rem;
  overflow: hidden;
  min-height: 500px;
}

.category {
  display: flex;
  position: relative;
  z-index: 2;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
}

@media (min-width: 500px) {
  .categories {
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-left: 2rem;
    width: 20%;
  }
}
</style>
