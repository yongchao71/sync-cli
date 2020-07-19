const chokidar = require('chokidar');
const path = require('path');
const fsSync = require('fs-sync');
const rimraf = require('rimraf');
const { log, success } = require('../lib/logger');
const config = require('../config/config.json');

function startWatch() {
    const result = fsSync.copy(config.source, config.destination, { force: true })
    console.log('copy result=====>>>', result);
    // const rmResult = rimraf.sync(config.destination);
    // console.log('rmResult====>', rmResult);
    const watcher = chokidar.watch(config.source, { persistent: true }).on('ready', (...result) => {
        log('result------>>>', result);
        watcher.on('change', (path) => {
            log('path===change===>>>', path);
        });
        watcher.on('add', (path) => {
            log('add======>>>', path);
        });
        watcher.on('unlink', (path) => {
            log('unlink======>>>', path);
        });
    });


    return watcher;
}

module.exports = {
    startWatch
}