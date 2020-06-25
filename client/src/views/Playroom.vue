<template>
  <div class="container">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">{{ this.soal }}</h1>
        <button type="button" class="btn btn-success btn-lg">Start Game</button>
        <br />
        <br />
        <h3>{{ this.timer }}</h3>
      </div>
    </div>
    <div class="input-group input-group-lg">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-lg">input type here</span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
      />
    </div>
    <br />
    <div class="row">
      <div class="card col-md-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title bg-primary">Player 1</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the</p>
        </div>
      </div>
      <div class="card col-md-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title bg-danger">Player 2</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the</p>
        </div>
      </div>
      <div class="card col-md-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title bg-warning">Player 3</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the</p>
        </div>
      </div>
      <div class="card col-md-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title bg-info">Player 4</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import socket from "@/config/socket";
export default {
  data() {
    return {
      soal: "",
      inputJawaban: "",
      timer: 3000
    };
  },
  created() {
    socket.on("getSoal", response => {
      this.soal = response;
    });
  },
  computed: {},
  watch: {
    watchAnswer: newAnswer => {
      if (newAnswer === this.soal) {
        addScore();
        socket.on("getSoal", response => {
          this.soal = response;
        });
      }
    },
    watchTimer: newTimer => {
      if (newTimer === 0) {
        finishGame();
      }
    }
  },
  methods: {
    startGame() {
      this.getSoal();
      this.startTimer();
    },
    startTimer() {
      setTimeout(() => {
        alert("Hello");
      }, 3000);
    },
    getSoal() {
      axios
        .get("https://dev.farizdotid.com/api/daerahindonesia/kota", {
          params: {
            id_provinsi: 35
          }
        })
        .then(response => {
          let randomNumber = Math.floor(Math.random() * (37 - 0 + 1)) + 0;
          let generateSoal = response.data.kota_kabupaten[randomNumber].nama;
          //   console.log(response.data);
          socket.emit("getSoal", generateSoal);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addScore() {
      socket.emit("addScore", { username: localStorage.username });
    },
    endGame() {}
  }
};
</script>

<style></style>
