<template>
  <div>
    <div>
      <div class="box">
        <div class="sbox1">
          <div class="timerBox">
            <p>timer</p>
          </div>
          <div class="tbox">
            <span class="question">{{ this.soalString }}</span>
          </div>
        </div>
        <div class="answer">
          <div class="textCont">
            <input
              class="textInput"
              type="text"
              v-model="inputJawaban"
              placeholder="Input answer here"
            />
          </div>
          <div class="buttonContainer">
            <div class="group">
              <button type="button" class="button btn btn-success" @click="startGame">START</button>
              <button type="button" class="button btn btn-danger">LEAVE</button>
            </div>
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
      soalString: "",
      roomAdmin: "",
      disabledButton: false
    };
  },
  created() {
    // this.getSoal();
    socket.on(localStorage.room, response => {
      console.log("ini dicreated", response);
      this.soalString = response[0];
      this.$store.commit("setSoal", response);
    });

    socket.on("updateScore", data => {
      this.$store.commit("setRooms", data);
    });
  },
  computed: {
    stateRoom() {
      return this.$store.state.rooms;
    },
    stateSoal() {
      return this.$store.state.soal;
    },
    buttonDisabled() {
      console.log(this.stateRoom[0]);

      for (let i = 0; i < this.stateRoom.length; i++) {
        if (this.stateRoom[i].name == localStorage.room) {
          this.roomAdmin = this.stateRoom[i].admin;
        }
      }
      if (this.roomAdmin != localStorage.username) {
        return (this.disabledButton = true);
      }
    }
  },
  watch: {
    inputJawaban(newAnswer) {
      if (newAnswer === this.soalString) {
        let soals = this.stateSoal;
        console.log(soals, "bawah");
        for (let i = 0; i < soals.length; i++) {
          // console.log("dalam for");
          if (soals[i] === this.soalString) {
            console.log(soals[i + 1]);
            this.soalString = soals[i + 1];
            break;
            console.log(this.soalString, "dalam if dalam");
          }
        }
        this.addScore();
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
      // this.getSoal();
      axios
        .get("https://dev.farizdotid.com/api/daerahindonesia/kota", {
          params: {
            id_provinsi: 35
          }
        })
        .then(response => {
          let setSoal = [];

          for (let i = 0; i < response.data.kota_kabupaten.length; i++) {
            let randomNumber = Math.floor(Math.random() * (37 - 0 + 1)) + 0;
            let generateSoal = response.data.kota_kabupaten[randomNumber].nama;
            setSoal.push(generateSoal);
          }
          console.log(setSoal);
          this.soalString = setSoal[0];
          this.$store.commit("setSoal", setSoal);
          //   console.log(response.data);
          socket.emit("startGame", { receiver: localStorage.room, soal: setSoal });
        })
        .catch(error => {
          console.log(error);
        });

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
          socket.emit("getSoal", { receiver: localStorage.room, soal: generateSoal });
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

<style>
body .box {
  /* display: grid;
    grid-template-columns: 3fr 1fr; */
  /* background-color: red; */
  /* height: 100vh; */
  /* background-color: red; */
  background-color: #3f72af;
}
.sbox1 {
  background-color: #3f72af;
}
.sbox2 {
  background-color: #3f72af;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.timerBox {
  color: white;
  width: 100%;
  font-size: 50px;
  margin: 0px auto;
  text-align: center;
  background-color: #112d4e;
}
.tbox {
  text-align: center;
  margin: 120px auto;
}
.question {
  font-size: 130px;
}
.score {
  font-size: 30px;
  margin: 15px 10px;
  background-color: white;
  padding: 5px 20px;
}
.chat {
  background-color: white;
  padding: 20px;
  margin: 10px;
  height: 300px;
  overflow: auto;
}
.textCont {
  /* margin-top: 470px; */
  margin: 10px;
  /* width: 100%; */
}
.textInput {
  display: block;
  font-size: 30px;
  /* padding-left: 50px; */
  text-align: center;
  width: 50%;
  height: 60px;
  margin: 0 auto;
}
.buttonContainer {
  width: 100%;
}
.button {
  width: 500px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.group {
  width: 500px;
  margin: 0 auto;
}
.answer {
  margin: 0 auto;
  height: 230px;
  padding: 15px;
  width: 100%;
  background-color: #112d4e;
}
</style>
