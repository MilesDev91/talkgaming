<template>
  <div class="nav">
    <a class="nav-logo" href="/">Talk Gaming</a>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "@/assets/scss/styles.scss";

.nav {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: $nav-background-color;
}

.nav-logo {
  text-decoration: none;
  font-weight: bold;
  color: $nav-text-color;
}

.nav-links {
  justify-content: space-between;
}

.nav-links a {
  color: $nav-text-color;
  padding: 1rem;
  text-decoration: none;
}

.nav-links a.router-link-exact-active {
  background-color: $nav-link-active;
  color: $text-color;
}
</style>