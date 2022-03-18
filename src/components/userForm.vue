<template>
  <form @submit.prevent class="user-form">
    <!-- TODO: Implement usernames in login (currently used for display, not authentication) -->
    <input
      class="user-form-input"
      v-if="props.isNewUser"
      v-model="input.username"
      type="text"
      name="username"
      placeholder="Username"
    />
    <input type="text" name="email" v-model="input.email" placeholder="Email" />
    <input
      class="user-form-input"
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <!-- Register New User -->
    <div class="user-button" v-if="props.isNewUser">
      <button
        class="submit-button"
        type="submit"
        @click.prevent="
          this.$emit('create-user', input.email, input.password, input.username)
        "
      >
        Register
      </button>
      <p>
        Already have an account? Login
        <router-link to="/login">here.</router-link>
      </p>
    </div>
    <!-- Login new user -->
    <div class="user-button" v-else>
      <button
        class="submit-button"
        type="submit"
        @click="this.$emit('login-user', input.email, input.password)"
      >
        Login
      </button>
      <p>
        Don't have an account? Create one
        <router-link to="/register">here.</router-link>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    isNewUser: { type: Boolean },
  },
  setup(props) {
    var input = { email: "", password: "", username: "" };

    return {
      input,
      props,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.user-form-input {
  margin: 0.5rem 0;
}

.submit-button {
  align-self: flex-start;
}

.user-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.user-button {
  display: flex;
  justify-content: space-between;
}
</style>
