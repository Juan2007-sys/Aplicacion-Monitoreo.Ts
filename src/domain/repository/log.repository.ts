import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// Patrón Repository (Domain Layer) - Abstracción entre domain y data access

// Desacopla la lógica de negocio de los detalles de persistencia
export abstract class LogRespository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLog(severity: LogSeverityLevel): Promise<LogEntity[]>;
}