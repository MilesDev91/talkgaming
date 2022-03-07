<template>
  <u-page-container width="60%">
    <h1>Login to your account</h1>
    <u-user-form :isNewUser="false" @login-user="loginUser"></u-user-form>
  </u-page-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const auth = getAuth();

    function loginUser(email, password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push("/");
        })
        .catch((error) => console.log(error));
    }

    return {
      loginUser,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
</style>
