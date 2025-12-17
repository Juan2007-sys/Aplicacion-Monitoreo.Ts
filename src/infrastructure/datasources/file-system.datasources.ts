import * as fs from 'fs';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { log } from 'console';

// Infrastructure: implementación concreta del DataSource, persiste logs en el sistema de archivos
export class FileSystemDataSource implements LogDataSource {

    // Rutas de los archivos de log por nivel de severidad
    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-all.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';


    constructor(){
        this.createLogFiles(); // Garantiza que existan los archivos al iniciar

    }


    // Crea la estructura de directorios y archivos de log si no existen
    private createLogFiles = () => {
        // Crear directorio si no existe
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }
        
        // Inicializar archivos de log por nivel de severidad
        [
            this.allLogPath,
            this.mediumLogPath,
            this.highLogPath
        ].forEach( path => {
            // Solo crea el archivo cuando no existe
            if(fs.existsSync(path)) return;
            fs.writeFileSync(path, '');

    })

    }
     // Guarda un log en el archivo correspondiente
    async saveLog(newlog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newlog)}\n`;
        // Guardar en archivo general (histórico completo)
        fs.appendFileSync(this.allLogPath, logAsJson );

        // Si es low, solo va al archivo general
        if(newlog.level === LogSeverityLevel.low) return;

        // Medium se bifurca a su archivo, high se va al dedicado
        if (newlog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogPath, logAsJson );
            
        }else{
            fs.appendFileSync(this.highLogPath, logAsJson );
        }

    
        }

        // Lee un archivo y mapea cada línea a LogEntity
        private getLogsFromFile =(path : string): LogEntity [] =>{
            const content = fs.readFileSync(path, 'utf-8');
            // Cada línea es un JSON serializado de LogEntity
            const Logs = content.split('\n').map(
                log => LogEntity.FromJson(log));
                return Logs;
        }

    async getLog(severity: LogSeverityLevel): Promise<LogEntity[]> {

        // Selecciona el archivo según la severidad solicitada
        switch(severity){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogPath);  
              
            default:
                throw new Error(`${severity} not implemented`);    
                
                
        }
        
    }


}