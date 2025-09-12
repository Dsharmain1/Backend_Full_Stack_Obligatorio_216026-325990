const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

// const { loggerMiddleware } = require('./middlewares/logger.middleware');
// const { authMiddleware } = require('./middlewares/auth.middleware');

const instrumentsRouter = require('./routes/Instruments.router');
// const publicRouter = require('./routes/public.router');

const app = express();

app.use(express.json());
// app.use(loggerMiddleware);
app.use(morgan("dev"));

// app.use("/public", publicRouter);

// app.use(authMiddleware);

app.use("/v1", instrumentsRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("App started and listening in port " + port);
})