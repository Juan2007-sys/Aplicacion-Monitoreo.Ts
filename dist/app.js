"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server = require("./presentation/server");
(async () => {
    await main();
})();
function main() {
    server.Server.start();
}
//# sourceMappingURL=app.js.map