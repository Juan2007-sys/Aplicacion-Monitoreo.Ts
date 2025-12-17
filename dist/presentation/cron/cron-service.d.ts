import { CronJob } from 'cron';
type CronTime = string | Date;
type OnTickFunction = () => void;
export declare class CronService {
    static createJob(cronTime: CronTime, onTick: OnTickFunction): CronJob;
}
export {};
//# sourceMappingURL=cron-service.d.ts.map