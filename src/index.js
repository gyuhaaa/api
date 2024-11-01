import http from "http";
import app from "./app.js";

const PORT = 5002;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Start service on ${PORT} port!`);
});
