import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRespository } from "../../repository/log.repository";

// Use Case (Domain Layer) - Lógica de negocio independiente de frameworks
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

// Callbacks para notificar resultados de forma desacoplada
type SuccessCallback = () => void; 
type ErrorCallback = (error: string) => void;

// Implementa el use case de verificación de servicios
export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRespository: LogRespository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        
    ){}


    // Ejecuta la verificación del servicio (HTTP request)
    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service, ${url}`);
            }

            // Notifica éxito mediante callback

            const log = new LogEntity(`Service ${url} is working `, LogSeverityLevel.low);

            this.logRespository.saveLog(log);
            this.successCallback();
            return true;
            
        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity(`Service ${url} is not working: ${errorMessage}`, LogSeverityLevel.high);
            this.logRespository.saveLog(log);
            
            // Notifica error mediante callback
            this.errorCallback(errorMessage);
            return false;
            
        }


    }
}