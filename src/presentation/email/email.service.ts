// Envío de correos con nodemailer
import * as nodemailer from 'nodemailer';
// Variables de entorno ya validadas
import { envs } from '../../config/plugins/envs.plugins';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


// Datos mínimos para enviar un correo
interface SendEmailOptions {
    to: string | string[];      // Destinatarios
    subject: string;            // Asunto
    htmlBody: string;           // Cuerpo en HTML
    attachments?: Attachment[]; // Adjuntos (opcional)
}

// Estructura de un adjunto
interface Attachment{
    filename: string; // Nombre del archivo
    path: string;     // Ruta local
}

// Servicio de emails de la app
export class EmailService {
    
    // Transporte configurado con el servicio y credenciales
    private transporter = nodemailer.createTransport({
        service : envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_PASSWORD_KEY
        }
    });

    

    // Envía un correo con las opciones indicadas
    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const{to, subject, htmlBody, attachments } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            // console.log(sentInformation); // Info del envío
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'EmailService.ts',
            });


            return true;
        } catch (error) {

            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'EmailService.ts',
            });


            return false;
        }
    }

    // Prepara y envía los logs como adjuntos
    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = 'Logs de Monitoreo';
        const htmlBody = '<h3>Logs de Monitoreo</h3> <p> Ver logs adjuntos. </p>';
        const attachments: Attachment[] = [
            { filename: 'Logs-all.log', path: './logs/Logs-all.log' },
            { filename: 'Logs-medium.log', path: './logs/Logs-medium.log' },
            { filename: 'Logs-high.log', path: './logs/Logs-all.log' },
        ]; 

        return this.sendEmail({ to, subject, htmlBody, attachments });
    }

}