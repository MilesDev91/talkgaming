<template>
  <h1>Create a new account</h1>
  <u-user-form
    isNewUser
    @create-user="createUser(email, password)"
    class="register-form"
  ></u-user-form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Register",
  setup() {
    const auth = getAuth();

    function createUser(email, password) {
      console.log(email, password);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          // TODO: Pass user to database
        })
        .catch((error) => console.log(error));
    }

    return {
      createUser,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.register-form {
  width: 50%;
  margin: 2rem auto;
}
</style>