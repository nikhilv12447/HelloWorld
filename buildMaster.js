const { exec } = require('node:child_process');
function execCmd(cmd) {
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(err)
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stdout: ${stderr}`);
    });
}
const products = process.argv[2]
const serverBuildCmd = `npx webpack ${products ? `--env PRODUCTS=${products}` : ""} --config ./config/webpack/server.config.js`
const clientBuildCmd = `npx webpack ${products ? `--env PRODUCTS=${products}` : ""} --config ./config/webpack/client.config.js`
execCmd(serverBuildCmd)
execCmd(clientBuildCmd)