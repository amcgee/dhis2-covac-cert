import dotenv from "dotenv";

dotenv.config();

import("./lib/server").then(({ start }) => {
  const port = process.env.PORT || 9090; // default port to listen
  start(port);
});
