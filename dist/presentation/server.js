"use strict";
const cron_service_1 = require("./cron/cron-service");
const check_service_1 = require("../domain/use-cases/checks/check-service");
class Server {
    static start() {
        console.log("Server started...");
        cron_service_1.CronService.createJob('*/5 * * * * *', () => {
            const url = 'https://www.google.com';
            new check_service_1.CheckService(() => console.log(`${url} check succeeded.`), (error) => console.log(error)).execute(url);
            // new CheckService().execute('http://localhost:3000')
        });
    }
}
module.exports = { Server };
//# sourceMappingURL=server.js.map