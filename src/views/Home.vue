<template>
  <div class="home">
    <h1>Choose a category</h1>
    <div class="categories">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script>
import { useState } from "@/maphelpers";

export default {
  name: "Home",
  setup() {
    const { categories } = useState(["categories"]);

    return {
      categories,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.categories {
  background-color: aliceblue;
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
