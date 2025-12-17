import server = require("./presentation/server");


(async() => {
   await main();
    
}) ();

function main() {
    server.Server.start();
}
