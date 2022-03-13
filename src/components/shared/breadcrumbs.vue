<template>
  <Breadcrumb :home="home" :model="items" />
</template>

<script>
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const home = ref({
      icon: "pi pi-home",
      to: "/",
    });

    const items = ref([]);

    const post = computed(() => {
      return store.state.posts;
    });

    function breadcrumbPath() {
      items.value = [];
      const initialPathArray = router.currentRoute.value.path.split("/");
      // form the display array and pathing array from the split full path. pathing array will join the previous ones as the loop continues (to form a complete path for each breadcrumb)
      for (let i = 1; i < initialPathArray.length + 1; i++) {
        let arraySection = initialPathArray.slice(0, i);
        items.value.push({
          label: initialPathArray[i - 1],
          to: arraySection.join("/"),
        });
      }

      // check the end for a post id. replace label with name of post if so
      if (items.value[items.value.length - 1].label.length > 15) {
        items.value[items.value.length - 1].label = store.state.posts.title;
      }

      items.value.shift();
    }

    watch(router.currentRoute, breadcrumbPath);
    watch(post, breadcrumbPath);

    breadcrumbPath();
    return {
      items,
      home,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/styles.scss";
</style>
