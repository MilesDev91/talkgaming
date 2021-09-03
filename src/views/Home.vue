<template>
  <div class="home">
    <h1>Choose a category</h1>
    <div class="categories">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category"
        @click="routeTo(category.title)"
      >
        <div class="darken-container"></div>
        <img
          class="category-image"
          :src="getPath(category.image)"
          :alt="'Image for ' + category.title"
        />

        <div style="z-index: 2">{{ category.title }}</div>
      </div>
    </div>
  </div>
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

    // Setup categories
    store.dispatch("getCategories");

    // Store mappings
    const { categories } = useState(["categories"]);

    // Functions
    const routeTo = (category) => {
      router.push({ name: "Category", params: { category: category } });
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

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.categories {
  background-color: $forum-contents-background-color;
  margin: 4rem auto;
  display: grid;
  grid-template-columns: 8rem 8rem;
  border: 1px solid black;
  border-radius: 4rem;
  grid-auto-rows: 8rem;
  overflow: hidden;
}
@media (min-width: 500px) {
  .categories {
    flex-direction: row;
  }
}

.category {
  display: flex;
  justify-content: center;
  align-items: center;
  // Combined with overflow: hidden on parent, this hides border on bottom items.
  margin: -0.01rem;
  text-align: center;
  border-bottom: 1px solid gray;
  position: relative;
  z-index: 2;
  color: white;
}

.darken-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.424);
  z-index: 1;
}

.category-image {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.category:hover {
  cursor: pointer;
}

.category:nth-child(odd) {
  border-right: 1px solid gray;
}
</style>
