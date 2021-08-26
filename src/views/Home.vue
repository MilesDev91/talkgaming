<template>
  <div class="home">
    <h1>Choose a category</h1>
    <div class="categories">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category"
        @click="routeTo(category)"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useState } from "@/maphelpers";

export default {
  name: "Home",
  setup() {
    // Router setup
    const router = useRouter();

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
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 4rem;
}
@media (min-width: 500px) {
  .categories {
    flex-direction: row;
  }
}

.category {
  border-bottom: 1px solid gray;
  padding: 2rem;
}

@media (min-width: 500px) {
  .category {
    border-bottom: none;
    border-right: 1px solid gray;
  }
}

.category:last-child {
  border: none;
}
</style>
