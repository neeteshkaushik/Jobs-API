require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connectDB");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const routeNotFound = require("./middlewares/route-not-found");
const authRouter = require("./routes/auth");
const jobsRoter = require("./routes/jobs");
const cors = require("cors");
const xss = require("express-rate-limit");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const port = process.env.PORT || 3000;

//swagger implemantaion
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());

//sercurity middlewares
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(xss());
app.use(cors());

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1> <a href="/api-docs">Swagger docs</a>');
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//auth routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRoter);

//error handler and page not found middlewares
app.use(errorHandler);
app.use(routeNotFound);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server started on port ${port} .....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
