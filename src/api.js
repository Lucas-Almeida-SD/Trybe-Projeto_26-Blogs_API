const express = require('express');
const routers = require('./routers');
const errorMiddleware = require('./middlewares/errorMiddleware');

// ...

const app = express();

app.use(express.json());

app.use('/login', routers.loginRouter);
app.use('/user', routers.userRouter);
app.use('/categories', routers.categoryRouter);
app.use('/post', routers.postRouter);

app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
