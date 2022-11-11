import {server} from "./app";

(async function() {
    server.listen(3000, () => {
        console.log("Listening on localhost: 3000");
    });

    process.on("unhandledRejection", (err) => {
        console.log(`ERROR: ${err}`);
        // Close server & exit process
        server.close(() => process.exit(1))
    })
})();