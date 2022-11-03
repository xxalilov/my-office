import express, { json } from "express";
import cookieParser from "cookie-parser";
import { NotFoundError } from "./errors/not-found-error";
import { asyncHandler } from "./middlewares/async";
import { authRoutes } from "./routes/auth";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

// Cookie Parser
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.all(
  "*",
  asyncHandler(async () => {
    throw new NotFoundError("Route not found!");
  })
);
app.use(errorHandler);

export { app };
