<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-3 card" style="margin: 1em auto;">
        <form  @submit.prevent="login" class="form-signin">
          <h6 class="h3 mb-3 font-weight-normal">Input Your Nickname to Start the game!</h6>
          <label class="sr-only">Username</label>
          <input v-model="username" type="username" class="form-control">
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
    };
  },
  methods: {
    login() {
      localStorage.setItem('isloggedin', this.username);
      this.$store.commit('SET_ISLOGGEDIN', this.username);
      localStorage.setItem('username', this.username);
    },
  },
};
</script>

<style scoped>
</style>
