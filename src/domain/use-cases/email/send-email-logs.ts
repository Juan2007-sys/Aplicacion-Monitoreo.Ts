// Use case para enviar logs por email
import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRespository } from "../../repository/log.repository";

// Contrato del use case
interface SendLogEmailUseCase{
    execute(to: string | string[]): Promise<boolean>;
}

// Lógica de negocio: envía logs y registra el resultado
export class SendEmailLogs implements SendLogEmailUseCase{
    constructor(
        private readonly emailService: EmailService,     // Inyección del servicio de email
        private readonly logRepository: LogRespository   // Inyección del repositorio de logs
    ){}

    // Ejecuta el envío de logs a los destinatarios indicados
    async execute(to: string | string[]): Promise<boolean> {
        try {
            const send = await this.emailService.sendEmailWithFileSystemLogs(to);
            if(!send){
                throw new Error('Email could not be sent');
            }

            // Si el envío es exitoso, registra un log de éxito
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'logs email sent successfully',
                origin: 'send-email-logs.ts',
            });
            
            await this.logRepository.saveLog(log);
            return true;

        // Si algo falla, registra el error y devuelve false
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `${error}`,
                origin: 'send-email-logs.ts',
            });
            
            await this.logRepository.saveLog(log);
            return false;
        }
    }
}