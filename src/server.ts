import app from "./app";
import Debug from "debug";
import http from "http";
import { syncModels } from "./configs/connect";

const debug = Debug("game:server");

const port = normalizePort(process.env.PORT || "4300");

//HTTP connection, port listener and multithread cluster workers will be handled here

app.set("port", port);

const server = http.createServer(app);

/**
 * Listen on provided port number
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: number | string) {
  var port = parseInt(val.toString(), 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string";

  switch (error.code) {
    case "EACCES":
      console.log(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.log(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" and connecting to DB event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
  syncModels();
  // connect();
}
