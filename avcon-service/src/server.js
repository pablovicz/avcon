import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);




app.listen(8001, ()=> console.log('Servidor rodando na porta 8001'));
