const chokidar = require('chokidar');
const { log, success } = require('../lib/logger');
const config = require('../config/config.json');

function startWatch() {
    const watcher = chokidar.watch(config.source, { persistent: true }).on('ready', (...result) => {
        log('result------>>>', result);
    });
    watcher.on('change', (path, stats) => {
        log('path======>>>', path);
        log('22222222222222222222222222222222222222', watcher.getWatched());
    });
    return watcher;
}

module.exports = {
    startWatch
}