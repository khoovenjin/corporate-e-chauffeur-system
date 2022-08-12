import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from "socket.io";
import init from './index.js';

// Use env port or default
dotenv.config()
const port = process.env.PORT || 5000;

const app = init();
const server = http.createServer(app);
const io = new Server(server);

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

//start the server
server.listen(port, () => console.log(`Server now running on port ${port}!`));

//connect to db
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.10bfq.mongodb.net/${process.env.MONGODB_COLLECTION}?retryWrites=true&w=majority`,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");

  console.log("Setting change streams");
  const thoughtChangeStream = connection.collection("thoughts").watch();

  thoughtChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        const thought = {
          _id: change.fullDocument._id,
          name: change.fullDocument.name,
          description: change.fullDocument.description,
        };

        io.of("/api/socket").emit("newThought", thought);
        break;

      case "update":
        thought = {
          _id: change.fullDocument._id,
          name: change.fullDocument.name,
          description: change.fullDocument.description,
        };

        io.of("/api/socket").emit("newThought", thought);
        break;

      case "delete":
        io.of("/api/socket").emit("deletedThought", change.documentKey._id);
        console.log(change)
        break;
    }
  });
});

connection.on("error", (error) => console.log("Error: " + error));