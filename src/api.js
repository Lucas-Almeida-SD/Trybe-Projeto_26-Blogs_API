const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const routers = require('./routers');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/login', routers.loginRouter);
app.use('/user', routers.userRouter);
app.use('/categories', routers.categoryRouter);
app.use('/post', routers.postRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorMiddleware);

module.exports = app;
