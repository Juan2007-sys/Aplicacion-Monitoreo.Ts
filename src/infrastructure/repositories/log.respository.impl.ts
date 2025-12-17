import { LogRespository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDataSource } from "../../domain/datasources/log.datasource";

// Infrastructure: implementación concreta del Repository que usa un DataSource inyectado
export class LogRepositoryImpl implements LogRespository {

    // Se inyecta un datasource (filesystem, db, etc.) para cumplir el contrato
    constructor(
        private readonly logdatasource: LogDataSource
    ){}

    // Delegación directa al datasource; el Repository actúa como fachada
    async saveLog(log: LogEntity): Promise<void> {
       return this.logdatasource.saveLog(log);
    }

    // Recupera logs según severidad desde la fuente de datos elegida
    async getLog(severity: LogSeverityLevel): Promise<LogEntity[]> {
       return this.logdatasource.getLog(severity);
    }

}