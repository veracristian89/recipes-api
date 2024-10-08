import express from 'express';
import {router as recipesRouter} from './src/router/recipes.router.js';
import { router as usersRouter } from './src/router/users.router.js';
import logger from './src/services/winstonLogger.js';
import 'dotenv/config';
import './db/dbconfig.js';

const port = process.env.PORT ?? 3000;

const app =  express();



app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(port,(err)=>{
    logger.info(!err? `server running at port: ${port}`:`server failed with error: ${err}`);
});

app.use('/api/recetas', recipesRouter);
app.use('/api/users', usersRouter);