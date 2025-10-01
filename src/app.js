const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const { loggerMiddleware } = require('./middlewares/logger.middleware');
const { authMiddleware } = require('./middlewares/auth.middleware');

const swagger = require('swagger-ui-express');
const swaggerJsonDoc = require('./documentation/swagger.json');

const privateRouter = require ('./routes/Instruments.router');
const loginRouter = require ('./routes/login.router');
const signupRouter = require ('./routes/signup.router');
const userRouter = require ('./routes/users.router');
const publicInstrumentsRouter = require ('./routes/public.instruments.router');
const userStatisticsRouter = require ('./routes/statistic.router');
const categoriesRouter = require ('./routes/categories.router');

const connectMongoDB = require('./repositories/mongo.client');

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(morgan("dev"));

//ENDPOINTS PUBLICOS SIN TOKEN
app.use("/public/v1", loginRouter)
app.use("/public/v1", signupRouter)
app.use("/public/v1", publicInstrumentsRouter)
app.use("/public/api-docs", swagger.serve, swagger.setup(swaggerJsonDoc));

//ENDPOINTS PRIVADOS CON TOKEN
app.use(authMiddleware);
app.use("/v1", privateRouter);
app.use("/v1", userRouter);
app.use("/v1", userStatisticsRouter);
app.use("/v1", categoriesRouter);


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
