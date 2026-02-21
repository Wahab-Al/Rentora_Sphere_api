//#region 
import app from "./app.js";
import { checkConnection } from "./config/database.js";
import { sysConfig } from "./config/env.js";
//#endregion

const PORT = sysConfig.port

async function runServer() {
  await checkConnection();
  
  app.listen(PORT, '0.0.0.0', ()=>{
    console.log('====================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log('====================================');  
  })
}

runServer()