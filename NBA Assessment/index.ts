
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import '@dotenvx/dotenvx/config';
import DraftHandler from './handlers/DraftHandler';

const app: express.Application = express();
const port: number = parseInt(process.env.PORT||'3000');

app.use(express.json());
app.use(cors());
app.use(helmet()); 

app.get('/draftpicks/:id',(_req, _res)=>  new DraftHandler().Handle(_req, _res));
 
// Server setup
app.listen(3000, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
});
