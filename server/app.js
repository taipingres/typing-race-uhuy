const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const cors = require('cors')

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());

io.on('connection', (socket) => {
  socket.on('coba', function (response){
      io.emit('coba', response)
  })
});

const data_game = {}
const data_kabupaten 
const db = []

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("visit", function (response) {
    console.log("apakah event visit terdengar ??");
    console.log(response);
    socket.broadcast.emit("visit", response)
  })

  socket.on("show_room", function(data) {
    // broadcast data_game
  })

  socket.on("create_room", function(data) {
    // update data_game
    // username dapet dari data
    // bikin jadi :
    {
      "blah": [{
        username: 'Shandy',
        score: 0
      }]
    }
  })

  socket.on("join_room", function(data) {
    // update data_game
    // data berisi nama room sama username yang mau gabung
    // bikin jadi :
    {
      "blah": [{
        username: 'Shandy',
        score: 0
      },
      {
        username: 'novritsa',
        score: 0
      }]
    }
  })

  socket.on("get_nama_kabupaten_pertama", function(data) {
    // get data kabupaten dari API
    // atau randomise data kabupaten yg di hardcode di awal
    // kirim index pertama dari array (data_kabupaten[0])
  })

  socket.on("add_score", function(data) {
    // update score berdasarkan nama room dan username
    {
      "blah": [{
        username: 'Shandy',
        score: 1
      },
      {
        username: 'novritsa',
        score: 1
      },
      {
        username: 'bakti',
        score: 10
      }]
    }
    // kirim kata selanjutnya ke novritsa
  })

  socket.on("end_game", function(data) {
    // cari pemenang
    // broadcast
    // on_game = false => client balik ke halaman home / dashboard
  })


  socket.on("send-message", function (message) {

    socket.broadcast.emit("new-message", message)
  })


  socket.on("send-message-private", function (response) {
    socket.broadcast.emit(response.to, response.message);
  })
  // emitter
  // lister
  // broadcast

  // didalam sini
});

http.listen(port, () => {
  console.log(`app listening on port ${port}`);
});