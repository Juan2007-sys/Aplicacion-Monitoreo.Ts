
// Niveles de severidad de los logs
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
     level: LogSeverityLevel;
     message:string;
     createdAt?: Date;
     origin: string;
}


// Entidad que representa un registro de log
export class LogEntity {
    public level: LogSeverityLevel;
    public message:string;
    public createdAt: Date;
    public origin: string

    constructor(options: LogEntityOptions) {

        const {level, message, createdAt = new Date(), origin} = options;
        this.message = message;
        this.level = level;
        // Timestamp automático del momento del registro
        this.createdAt = createdAt;
        this.origin = origin;
        
    }

    // Recrea un LogEntity a partir de una línea JSON almacenada en disco
    static FromJson = (json : string ): LogEntity => {
        const {message, level, createdAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: new Date(createdAt),
            origin: origin
        });
        // Se restaura la fecha original guardada en el log
        return log;
    }
       
}
