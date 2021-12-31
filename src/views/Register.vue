<template>
  <h1>Create a new account</h1>
  <u-user-form
    isNewUser
    @create-user="createUser"
    class="user-form"
  ></u-user-form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { database } from "@/main";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const auth = getAuth();

    function createUser(email, password, username) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          addUserToDatabase(username, user.email, user.uid);
          router.push("/");
        })
        .catch((error) => console.log(error));
    }

    // Need to add username, email, and userid to database
    async function addUserToDatabase(username, email, uid) {
      await setDoc(doc(database, "users", uid), {
        username,
        email,
      });
    }

    return {
      createUser,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";
</style>