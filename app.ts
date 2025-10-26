import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Subscription Tracker API" });
});

app.listen(3000, "localhost", () => {
  console.log(`Subscription Track API is running at http://localhost:3000`);
});

export default app;
