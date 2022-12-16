import { Server } from "socket.io";

export default async function API(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
      socket.on("saludar", (saludo) => {
        console.log(saludo);
        io.emit("saludo", saludo);
      });
    });
  }
  res.status(200).json({ message: "Connected" });
}
