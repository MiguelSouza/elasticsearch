import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('API de busca de usuários com PostgreSQL e Elasticsearch');
});

export default app;
