require("dotenv").config();


const morgan = require("morgan");

const express = require("express");

const app = express();

const errorHandler = require(
  "./middleware/errorHandler"
);

const swaggerUi = require(
  "swagger-ui-express"
);

const swaggerSpec = require(
  "./swagger"
);

const tasksRouter = require("./routes/tasks");

const authRouter = require("./routes/auth");


app.use(express.json());

app.use(morgan("dev"));

app.use("/tasks", tasksRouter);

app.use("/auth", authRouter);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);


const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });

}

module.exports = app;