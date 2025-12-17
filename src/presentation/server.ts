import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";


class Server{
	public static start(): void {
		console.log("Server started...");

		CronService.createJob(
			'*/5 * * * * *',
			() => {
				const url = 'https://www.google.com';

				new CheckService(
					() => console.log(`${url} check succeeded.`),
					(error) => console.log(error)
				).execute(url)
				// new CheckService().execute('http://localhost:3000')
				
			}
		);	
		
	}
}

export = { Server };