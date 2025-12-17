
// Niveles de severidad de los logs
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

// Entidad que representa un registro de log
export class LogEntity {
    public level: LogSeverityLevel;
    public message:string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.message = message;
        this.level = level;
        // Timestamp automático del momento del registro
        this.createdAt = new Date();
        
    }

    // Recrea un LogEntity a partir de una línea JSON almacenada en disco
    static FromJson = (json : string ): LogEntity => {
        const {message, level, createdAt} = JSON.parse(json);

        const log = new LogEntity(message, level);
        // Se restaura la fecha original guardada en el log
        log.createdAt = new Date(createdAt);
        return log;
    }
       
}
