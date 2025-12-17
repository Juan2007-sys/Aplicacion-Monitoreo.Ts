// Importa variables de entorno configuradas y validadas
import { envs } from "./config/plugins/envs.plugins";
import server = require("./presentation/server");

// Punto de entrada de la aplicación - IIFE asíncrona para ejecutar main
(async() => {
   await main();
    
}) ();

// Inicia el servidor de monitoreo
function main() {
    // server.Server.start(); // Inicia el servidor con cron jobs
    console.log(envs); // Muestra las variables de entorno cargadas
}
 