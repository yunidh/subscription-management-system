import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
const app = express();

app.use(express.json()); //handles json data in request body
app.use(express.urlencoded({ extended: true })); //handles urlencoded data in request body
app.use(cookieParser()); //parses cookies from incoming requests
app.use(errorMiddleware); //custom middleware

app.use(arcjetMiddleware); //for handling spam protection and bot detection

app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);
app.use("/api/subscriptions/", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("welcome to tracker");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
