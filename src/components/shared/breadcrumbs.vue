<template>
  <ul>
    <li><router-link to="/">Home</router-link> /</li>
    <div class="bread-wrap" v-if="pathArray[0] != ''">
      <li v-for="(path, index) in pathArray" :key="index">
        <router-link :to="path">{{ displayArray[index] }}</router-link> /
      </li>
    </div>
  </ul>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";

export default {
  setup() {
    const router = useRouter();

    // For display values
    const displayArray = reactive([]);

    // For path values
    const pathArray = reactive([]);

    function breadcrumbPath() {
      if (router.currentRoute.value.path == "/") {
        displayArray[0] = "";
        pathArray[0] = "";
        return null;
      }
      const initialPathArray = router.currentRoute.value.path.split("/");
      // form the display array and pathing array from the split full path. pathing array will join the previous ones as the loop continues (to form a complete path for each breadcrumb)
      for (let i = 1; i < initialPathArray.length + 1; i++) {
        let arraySection = initialPathArray.slice(0, i);
        displayArray[i - 1] = initialPathArray[i - 1];
        pathArray[i - 1] = arraySection.join("/");
      }
      pathArray.shift();
      displayArray.shift();
    }

    watch(router.currentRoute, breadcrumbPath);

    breadcrumbPath();
    return {
      pathArray,
      displayArray,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

ul {
  display: flex;
  flex-wrap: nowrap;
}

li {
  list-style-type: none;
}

.bread-wrap {
  display: flex;
}
</style>