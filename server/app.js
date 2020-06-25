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
      users: [],
      admin: response.admin
    }
    rooms.push(room)
    io.emit('createRoom', rooms)
  })

  socket.on('joinGame', function(response){
    socket.join(response.name, function(){
      let roomIndex = rooms.findIndex(i => i.name===response.name)
      rooms[roomIndex].users.push(response.username)
      socket.emit('joinGame', rooms)
    })
  })
});

http.listen(port, () => {
  console.log(`app listening on port ${port}`);
});