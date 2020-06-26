<template>
  <div class="container p-3 my-3 border">
    <!-- <h1 v-if="checkWinner">
      Congratulation You're the Winner!
    </h1>
    <h1 v-if="!checkWinner">
      Sorry You Lose The Game!
    </h1> -->
    <br>
    <h2>
      Below are the final Score!
    </h2>
    <div class="row justify-content-md-center">
      <div class="col-6">
        <table class="table table-dark">
          <thead>
            <tr>
              <td>Username</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody>
              <tr v-for="player in dataPlayer" v-bind:key="player.name">
                <td> {{ player.name }}</td>
                <td> {{ player.score }} </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '@/config/socket';

export default {
  name: 'Ending',
  data() {
    return {
      dataPlayer: null,
      username: localStorage.username,
      roomId: localStorage.roomId,
      checkWinner: false
    };
  },
  methods: {

  },
  created() {
    socket.emit('endGame', { username: this.username, roomId: this.roomId} );
    socket.on('endGame', (data) => {
      this.dataPlayer = data.players;
      this.checkWinner = data.winner;
    });
  }
};
</script>

<style>

</style>