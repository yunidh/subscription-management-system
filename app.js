import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(errorMiddleware); //custom middleware
app.use(express.json()); //handles json data in request body
app.use(express.urlencoded({ extended: true })); //handles urlencoded data in request body
app.use(cookieParser()); //parses cookies from incoming requests

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/subscriptions/", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("welcome to tracker");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
