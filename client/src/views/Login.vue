<template>
  <div class="container text-center">
    <!-- <div class="row"> -->
      <div class="card" style="margin: 1em auto;">
        <form @submit.prevent="login" class="form-signin">
          <h6 class="h3 mb-3 mt-4 font-weight-normal">Input Your Nickname to Start the game!</h6>
          <label class="sr-only">Username</label>
          <input v-model="username" type="username" class="form-control" />
          <button class="btn mt-3 btn-md btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    login() {
      this.$store.dispatch('getRooms');
      localStorage.setItem('isloggedin', this.username);
      this.$store.commit('SET_ISLOGGEDIN', this.username);
      localStorage.setItem('username', this.username);
      this.$router.push('/room');
    },
  },
};
</script>

<style scoped>
.btn {
    width: 70%;
  }
  .container{
    margin-top: 200px;
    height: 320px;
    width: 500px;
    color: white;
    /* overflow: hidden; */
  } 
  .card{
    background-color: #3f72af ;
    height: 270px;
    width: 100%;
  }
  .form-control {
    text-align: center;
    font-size: 25px;
    width: 70%;
    margin: 0 auto;
  }
</style>
