<template>
  <div class="user-form">
    <input type="text" name="email" v-model="input.email" placeholder="Email" />
    <input
      type="password"
      name="password"
      v-model="input.password"
      placeholder="Password"
    />
    <!-- Register New User -->
    <button
      v-if="props.isNewUser"
      @click="this.$emit('createUser', input.email, input.password)"
    >
      Register
    </button>
    <!-- Login new user -->
  </div>
</template>

<script>
export default {
  props: {
    isNewUser: { type: Boolean },
  },
  setup(props) {
    var input = { email: "", password: "" };

    return {
      input,
      props,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/styles.scss";

.user-form {
  display: flex;
  flex-direction: column;
}

input {
  margin: 0.5rem 0;
}

button {
  align-self: flex-start;
  background-color: $primary-button;
}
</style>