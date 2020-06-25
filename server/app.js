const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const cors = require('cors')

let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(cors());

io.on('connection', (socket) => {
  socket.on('coba', function (response){
      io.emit('coba', response)
  })
});

http.listen(port, () => {
  console.log(`app listening on port ${port}`);
});