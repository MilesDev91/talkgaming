<template>
  <div class="nav">
    <a class="nav-logo" href="/">Talk Gaming</a>
    <ul class="nav-links">
      <!-- The logout button is a p elements instead of a button to preserve the inline behavior of the navbar -->
      <li v-if="currentUser != null" @click="logout">Logout</li>
      <li v-else><router-link to="/login">Sign in</router-link></li>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const auth = getAuth();
    const currentUser = ref(auth.currentUser);

    function logout() {
      signOut(auth).catch((error) => console.log(error));
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser.value = user;
      } else {
        currentUser.value = null;
      }
    });

    return {
      logout,
      currentUser,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/styles.scss";

.nav {
  display: flex;
  justify-content: space-between;
  background-color: $nav-background-color;
}

.nav li {
  display: inline;
}

.nav-logo {
  text-decoration: none;
  font-weight: bold;
  color: $nav-text-color;
  align-self: center;
  padding-left: 1rem;
}

.nav-links {
  display: flex;
  margin: 0;
  min-height: 4rem;
}

.nav-links li {
  display: flex;
  height: 100%;
  align-items: center;
}

.nav-links a {
  color: $nav-text-color;
  padding: 1rem;
  text-decoration: none;
  white-space: nowrap;
}

.nav-links p {
  font-size: 1rem;
  padding: 1rem;
  display: inline;
  color: $nav-text-color;
  cursor: pointer;
}

.nav-links a.router-link-exact-active {
  background-color: $nav-link-active;
  color: $text-color;
}
</style>