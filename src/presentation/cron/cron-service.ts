import { CronJob } from 'cron';

// Tipos para las tareas cron
type CronTime = string | Date;
type OnTickFunction = () => void;

// Servicio de infraestructura que encapsula la gestión de tareas cron
// Simplifica la creación de jobs programados
export class CronService {
    // Factory method para crear y iniciar un job cron
    static createJob(cronTime: CronTime, onTick: OnTickFunction): CronJob {
        const job = new CronJob(
            cronTime,
            onTick,
        );
        // Inicia la ejecución del job
        job.start();
        

        return job;
     }
}