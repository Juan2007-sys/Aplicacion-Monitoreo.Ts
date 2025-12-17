import { CronJob } from "cron";


class Server{
	public static start(): void {
		console.log("Server started...");
		
		const job = new CronJob(
			'*/3 * * * * *',
			() => {
				const date = new Date();
				console.log('3 second', date);
			},
		);
		job.start();
		
	}
}

export = { Server };