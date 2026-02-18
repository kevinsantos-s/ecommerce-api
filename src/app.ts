import express from 'express';
import dotenv from 'dotenv';
import { routes } from './modules/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use(routes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API de E-commerce rodando!',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});