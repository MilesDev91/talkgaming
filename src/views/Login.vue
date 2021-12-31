<template>
  <h1>Login to your account</h1>
  <u-user-form
    :isNewUser="false"
    @login-user="loginUser"
    class="user-form"
  ></u-user-form>
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