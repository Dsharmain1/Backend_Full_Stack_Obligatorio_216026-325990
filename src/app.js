const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');


const loginRouter = require('./routes/login.router');
const instrumentsRouter = require('./routes/Instruments.router');

const connectMongoDB = require('./repositories/mongo.client')

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan("dev"));

app.use("/public/v1", loginRouter)

app.use(authMiddleware);
app.use("/v1", instrumentsRouter);

(async () => {
    try {
        await connectMongoDB();
        console.log("conexión mongoDB ok")

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log("App started and listening in port " + port);
        })
    } catch (error) {
        console.log("Error conectando con mongoDB", error);
        process.exit(1);
    }
})();
