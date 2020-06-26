const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const cors = require('cors');
const { RSA_NO_PADDING } = require('constants');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let rooms = []

app.use(cors());

// app.get('/', (req, res)=>{
//   res.send('welcome to the jungle')
// })

io.on('connection', (socket) => {
  socket.on('getRooms', function (response){
    // console.log(response, 'ini responseeeee');
    // console.log(rooms, 'ini rooommmssss')
    io.emit('getRooms', rooms)
  })

  socket.on('createRoom', function (response){
    let room;
    let roomId;
    if(rooms.length===0){
      room = {
        id: 1,
        name: response.name,
        users: [{
          name: response.admin,
          score: 0,
        }],
        admin: response.admin
      }
      roomId = room.id
    } else{
      room = {
        id: rooms[rooms.length-1].id+1,
        name: response.name,
        users: [{
          name: response.admin,
          score: 0,
        }],
        admin: response.admin
      }
      roomId = room.id
    }
    rooms.push(room)
    // console.log(rooms)
    io.emit('createRoom', {rooms, roomId})
  })

  socket.on('joinGame', function (response) {
    socket.join(response.name, function () {
      let roomIndex = rooms.findIndex(i => i.name === response.name)
      rooms[roomIndex].users.push({
        name: response.username,
        score: 0
      })
      let roomId = rooms[roomIndex].id
      // console.log(rooms)
      // socket.emit('joinGame', rooms)
      io.emit('joinGame', {rooms, roomId})
    })
  })

  socket.on("show_room", function (data) {
    // broadcast data_game
  })

  // socket.on("getSoal", function (data) {
  //   // get data kabupaten dari API
  //   // atau randomise data kabupaten yg di hardcode di awal
  //   // kirim index pertama dari array (data_kabupaten[0])
  //   // console.log('ini get soal', data)
  //   let randomNumber = Math.floor(Math.random() * (37 - 0 + 1)) + 0;
  //   let generateSoal = data.soal[randomNumber]
  //   // console.log(generateSoal)
  //   // console.log(data.receiver)
  //   socket.emit(data.receiver, generateSoal.nama);
  // })

  socket.on("startGame", function (data) {
    // io.emit(data.receiver, data.soal)
    // io.sockets.emit(data.receiver, data.soal)
    socket.broadcast.emit(data.receiver, data.soal);
    let counter = 30;
    let WinnerCountdown = setInterval(function(){
      io.sockets.emit('counter', counter);
      counter--
      if (counter === 0) {
        io.sockets.emit('counter', "Congratulations You WON!!");
        io.sockets.emit('end', "endingGame");
        clearInterval(WinnerCountdown);
      }
    }, 1000);
  })


  socket.on("addScore", function (data) {
    // update score berdasarkan nama room dan username
    // {
    //   "blah": [{
    //     username: 'Shandy',
    //     score: 1
    //   },
    //   {
    //     username: 'novritsa',
    //     score: 1
    //   },
    //   {
    //     username: 'bakti',
    //     score: 10
    //   }]
    // }
    // kirim kata selanjutnya ke novritsa
    // console.log(rooms)
    rooms.forEach(element => {
      // console.log('masuk for each')
      if (element.name == data.room) {
        // console.log('masuk for each1')
        element.users.forEach(element1 => {
          // console.log('masuk for each2')
          if (element1.name == data.username) {
            // console.log('masuk for each3')
            element1.score++
            // console.log(element, 'ini di score')
          }
        })
      }
    })
    socket.emit('updateScore', rooms)

  })

  socket.on("endGame", function (response) {
    // cari pemenang
    // broadcast
    // on_game = false => client balik ke halaman home / dashboard
    roomId =  response.roomId;
    let players = rooms[roomId-1].users;
    players.sort(function(a, b){
      return b.score - a.score;
    });
    let maxScore = players[0].score;
    let winner = false;
    for (let i in players){
      if(players[i].score == maxScore){
        if(players[i].name == response.username){
          winner = true;
        }
      }
    }
    io.sockets.emit('endGame', {players, winner})
  })

});


http.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
