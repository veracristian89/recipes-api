import express from 'express';
import {router as recipesRouter} from './src/router/recipes.js';

const port = process.env.PORT ?? 3000;

const app =  express();

app.listen(port,(err)=>{
    console.log(!err? `server running at http://localhost:${port}`:`server failed with error: ${err}`);
});

app.use('/api/recetas', recipesRouter);