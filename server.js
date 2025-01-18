import http from "http";
import app from "./app.js";
const port = process.env.PORT || 4000;
const server = http.createServer(app);
import { initializeSocket } from "./sockets/chat.socket.js";
initializeSocket(server);
server.listen(port, () => {
  console.log("server is running at the port ", 4000);
});

export default server;
