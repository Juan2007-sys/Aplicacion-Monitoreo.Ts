import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// Abstracción (Domain Layer) - Define contrato para acceso a datos
// Las implementaciones concretas están en infrastructure/
export abstract class LogDataSource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLog(severity: LogSeverityLevel): Promise<LogEntity[]>;
}

