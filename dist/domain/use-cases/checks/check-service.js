"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckService = void 0;
class CheckService {
    successCallback;
    errorCallback;
    constructor(successCallback, errorCallback) {
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }
    async execute(url) {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service, ${url}`);
            }
            this.successCallback();
            // console.log(`${url} is up and running`);
            return true;
        }
        catch (error) {
            console.log(`${error} `);
            this.errorCallback(`${error} `);
            return false;
        }
    }
}
exports.CheckService = CheckService;
//# sourceMappingURL=check-service.js.map