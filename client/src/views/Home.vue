<template>
  <div class="home">
    <form @submit.prevent= "enterCoba">
      <input type="text" v-model= "kucoba">
    </form>
    <p>{{hasil}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import socket from '../config/socket';

export default {
  name: 'Home',
  data() {
    return {
      kucoba: '',
      hasil: [],
    };
  },
  methods: {
    enterCoba() {
      socket.emit('coba', this.kucoba);
    },
  },
  created() {
    socket.on('coba', (response) => {
      this.hasil.push(response);
    });
  },
};
</script>
