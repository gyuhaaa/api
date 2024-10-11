import http from "http";
import app from "./app";

const PORT = 5001;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Start service on ${PORT} port!`);
});
