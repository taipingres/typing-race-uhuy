<template>
  <div class="container">
    <div class="row justify-content-start px-5">
      <div class="col-2"></div>
      <div class="col-8">
        <h1 style="text-center">Typing Race</h1>
      </div>
      <div class="col-2 align-self-end">
        <h6>{{ username }}</h6>
      </div>
    </div>
    <div class="row justify-content-center m-3">
      <div class="col-11">
        <div class="card" style="min-height:90vh">
          <div class="card-header">
            <div class="container">
              <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                  <h4>Choose Your Room</h4>
                </div>
                <div class="col-3">
                  <input type="text" class="form-control mr-sm-2" v-model="newRoom" />
                  <input
                    type="button"
                    class="btn btn-outline-success my-2 my-sm-0"
                    value="Create"
                    @click="createRoom"
                  />
                </div>
              </div>
            </div>
        </div>
        <div class="row justify-content-center my-1">
          <div class="col-11">
            <div class="card" style="min-height:90vh">
              <div class="card-header">
                  <div class="container">
                      <div class="row">
                          <div class="col-3"></div>
                          <div class="col-6">
                              <h4>Choose Your Room</h4>
                          </div>
                          <div class="col-3">
                              <input type="text"
                              class="form-control mr-sm-2" v-model= "newRoom">
                              <input type="button"
                              class="btn btn-outline-success my-2 my-sm-0"
                              value="Create" @click= "createRoom">
                          </div>
                      </div>
                  </div>
              </div>
              <div class="card-body">
                <div v-if= "this.rooms.length !== 0">
                  <div class="container">
                    <div class="row">
                      <div v-for = '(room, i) in rooms' :key= "i">
                        <div class="col-3 m-3">
                          <div class="card" style="width: 18rem;">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            {{room.name}}
                                        </h5>
                                        <h6 class="card-title">
                                            admin: {{room.admin}}
                                        </h6>
                                        <a class="btn btn-info"
                                        @click= "joinGame(room.name)" >
                                            Join
                                        </a>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p class="text-center">No available room.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import socket from "@/config/socket";

export default {
  name: "Room",
  data() {
    return {
      newRoom: ""
    };
  },
  methods: {
    createRoom() {
      const payload = {
        name: this.newRoom,
        admin: localStorage.username
      };
      localStorage.setItem("room", payload.name);
      this.$router.push("/play-room");
      socket.emit("createRoom", payload);
    },
    joinGame(name) {
      const payload = {
        name,
        username: localStorage.username
      };
      localStorage.setItem("room", payload.name);
      socket.emit("joinGame", payload);
      this.$router.push("/play-room");
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    rooms() {
      return this.$store.state.rooms;
    }
  },
  created() {
    socket.on('getRooms', (data) => {
      this.$store.commit('setRooms', data);
    });

    socket.on('createRoom', (data) => {
      this.$store.commit('setRooms', data);
    });

    socket.on("joinGame", data => {
      this.$store.commit("setRooms", data);
    });
  }
};
</script>
