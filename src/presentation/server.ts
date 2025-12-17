
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.respository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasources";

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDataSource()
);

// Presentation Layer - Orquestación de la aplicación
// Coordina use cases y servicios de infraestructura
class Server {
    public static start(): void {
        console.log("Server started...");

        // Crea un job que verifica el servicio cada 5 segundos
        // Inyecta callbacks para manejar éxito y error
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://localhost:3000';
                

                // Instancia el use case con handlers específicos
                new CheckService(
					fileSystemLogRepository,
                    () => console.log(`${url} check succeeded.`),
                    (error) => console.log(error)
                ).execute(url)
                
            }
        );	
		
    }
}

export = { Server };