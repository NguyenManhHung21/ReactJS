import express from 'express';
import cors from 'cors';
import { connect } from './configdb';
import { userRoute } from './routes/userRoute';
import { messageRoute } from './routes/messageRoute';
import socket, { Server, Socket } from 'socket.io';
import { createServer } from 'http';

require('dotenv').config();
const app = express();
const httpServer = createServer(app);
app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoute);
app.use('/api/message', messageRoute);
connect();

// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server is lived on ${process.env.PORT}`)
// })

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.on('connection', (socket: Socket) => {
  // nhận socket có key là "add-user", userLoginedId nhận dc từ client
  socket.on('room', (userLoginedId) => {
    socket.join(userLoginedId); // cho thằng user đăng nhập đi vào phòng 'userLoginedId'
  });

  socket.on('send-msg', (data: { from: string; to: string; msg: string }) => {
    // socket.join(data.to); ~  dùng để gửi thông điệp đến các máy khách trong cùng một phòng nhưng không bao gồm chính máy khách gửi thông điệp này.
    socket.to(data.to).emit('msg-receive', { room: data.from, msg: data.msg }); // socket.to => gửi socket đến cái phòng 'data.to' đồng thời gửi di socket có key là 'msg-receive'
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is lived on ${process.env.PORT}`);
});
