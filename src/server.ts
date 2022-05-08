import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

// controla quais front-ends podem acessar o back-end
app.use(cors()); 
app.use(express.json());
app.use(routes);


app.listen(3333, () => {
  console.log('HTTP server running');
});

