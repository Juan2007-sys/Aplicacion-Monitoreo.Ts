
import { LogRepositoryImpl } from "../infrastructure/repositories/log.respository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasources";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDataSource()
);
const emailService = new EmailService();

// Presentation Layer - Orquestación de la aplicación
// Coordina use cases y servicios de infraestructura
class Server {
    public static start(): void {
        console.log("Server started...");

        

        // todo Mandar Email 
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['juanquevedoovalle2@gmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs('juanquevedoovalle2@gmail.com');


        // Crea un job que verifica el servicio cada 5 segundos

        // Inyecta callbacks para manejar éxito y error
            // CronService.createJob(
            //     '*/5 * * * * *',
            //     () => {
            //         const url = 'https://google.com';
                    

            //         // Instancia el use case con handlers específicos
            //         new CheckService(
            //             fileSystemLogRepository,
            //             () => console.log(`${url} check succeeded.`),
            //             (error) => console.log(error)
            //         ).execute(url)
                    
            //     }
            // );	
            
    }
}

export = { Server };