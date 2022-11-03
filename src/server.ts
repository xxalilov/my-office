import config from "./config/config";
import { app } from "./app";
import { db } from "./services/postgres";

const start = async () => {
  // Connect Database
  await db();

  const PORT = config.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

start();
