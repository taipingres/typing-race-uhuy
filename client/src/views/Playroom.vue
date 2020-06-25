<template> </template>

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
