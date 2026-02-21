//#region 
import express from 'express'
import type { Request, Response } from 'express';
//#endregion

const app = express();

// to parse automatically incoming JSON  & handle all incoming requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//404 Handler to catch requests for non-existent endpoints
app.use((request: Request, response: Response)=>{
  response.status(404).json({status: 'request fail', message: `Can´t find ${request.originalUrl} on this server!`})
})
//#endregion

export default app;