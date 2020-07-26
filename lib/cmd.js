const spawn = require('child_process').spawn;

exports.spawnProcess = (cmd, args = [], cb = '') => {
    const process = spawn(cmd, args);
    process.stdout.on('data', data => {
        console.log('data  stdout=======>>>', data);
    });
    process.on('close', function (status) {
        if (status == 0) {
            cb && cb();
        } else {
            const currentCmd = `${cmd} ${args.join(' ')}`
            cb && cb(new Error(`${currentCmd} failed with status ${status}`));
        }
    });
}
