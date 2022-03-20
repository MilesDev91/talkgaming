<template>
  <u-prime-menubar :model="items" />
</template>

<script>
import { ref, watchEffect } from "vue";
import { useState } from "../maphelpers";

// TODO: Implement search functionality here!
export default {
  setup() {
    const { categories } = useState(["categories"]);

    const items = ref([
      {
        label: "Category",
        items: [],
      },
    ]);

    watchEffect(() => {
      let categoryItems = [];
      for (let i in categories.value) {
        categoryItems.push({ label: categories.value[i].title });
      }
      items.value[0].items = categoryItems;
    });

    return { items };
  },
};
</script>
