const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const cors = require('cors')

let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(cors());

let rooms = []

io.on('connection', (socket) => {
  socket.on('coba', function (response){
      io.emit('coba', response)
  })
  socket.on('createRoom', function (response){
    let room = {
      name: response.name,
      users: [{
        name: response.admin,
        score: 0,
      }],
      admin: response.admin
    }
    rooms.push(room)
    console.log(rooms)
    io.emit('createRoom', rooms)
  })

  socket.on('joinGame', function(response){
    socket.join(response.name, function(){
      let roomIndex = rooms.findIndex(i => i.name===response.name)
      rooms[roomIndex].users.push({
        name: response.username,
        score: 0
      })
      console.log(rooms)
      socket.emit('joinGame', rooms)
    })
  })
});

http.listen(port, () => {
  console.log(`app listening on port ${port}`);
});