<template>
  <div>
    <div>
      <div class="box">
        <div class="sbox1">
          <div class="timerBox">
            <p>12</p>
          </div>
          <div class="tbox">
            <span class="question">{{ this.soal }}</span>
          </div>
        </div>
        <div class="sbox2">
          <div class="score">
            <p>
              player1: 0
              <br />
              player2: 0
              <br />
              player3: 0
              <br />
              player4: 10
              <br />
            </p>
          </div>

          <div class="chat">
            <p>
              <span class="text-muted"> <i>player1 joined the game!</i> <br /> </span>
              <span class="text-muted"> <i>player2 joined the game!</i> <br /> </span>
              <span class="text-muted"> <i>player3 joined the game!</i> <br /> </span>
              <span class="text-muted"> <i>player4 joined the game!</i> <br /> </span>
              player1: Malulu <br />
              player2: test <br />
              player3: Malukk <br />
              player4: Maluku <br />
              <span class="text-muted">
                <i>player4 correct, 10 points added to the score!</i>
              </span>
            </p>
          </div>

          <div class="textCont">
            <input
              class="textInput"
              type="text"
              placeholder="     input your answer here"
              v-model="inputJawaban"
            />
          </div>

          <div class="buttonContainer">
            <button type="button" class="button btn btn-success" @click="startGame">START</button>
            <button type="button" class="button btn btn-danger">LEAVE</button>
          </div>
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
      timer: 3000,
      soal: ""
    };
  },
  created() {
    // this.getSoal();
    // socket.on(localStorage.username, response => {
    //   console.log("ini dicreated", response);
    //   this.soal = response;
    // });
    // console.log("ini dicreated");
    // if (localStorage.username) {
    //   // console.log("ini diif");
    //   socket.on(localStorage.username, data => {
    //     // console.log("ini dicreated", data);
    //     this.soal = data;
    //   });
    // }
    socket.on("updateScore", data => {
      this.$store.commit("setRooms", data);
    });
  },
  computed: {},
  watch: {
    inputJawaban(newAnswer) {
      if (newAnswer === this.soal) {
        console.log(newAnswer, "bawah");
        this.addScore();
        this.getSoal();
        this.inputJawaban = "";
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
      // this.startTimer();
      // this.$store.state("setRooms", data);
      // socket.emit("addScore", { username: localStorage.username, room: localStorage.room });

      // let soalPertama = [];

      // for (let i = 0; i < this.$store.state("setRooms", data); i++) {

      // }
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
          this.soal = generateSoal;
          //   console.log(response.data);
          // socket.emit("getSoal", { receiver: localStorage.username, soal: generateSoal });
        })
        .catch(error => {
          console.log(error);
        });
    },
    addScore() {
      socket.emit("addScore", { username: localStorage.username, room: localStorage.room });
    },
    endGame() {}
  }
};
</script>

<style></style>
