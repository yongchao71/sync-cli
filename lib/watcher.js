const chokidar = require('chokidar');
const path = require('path');
const fsSync = require('fs-sync');
const rimraf = require('rimraf');
const { log, success, error } = require('../lib/logger');
const config = require('../config/config.json');
const { clean, copy, copyFile, deleteFile } = require('../lib/file');

async function startWatch() {
    const cleanResult = await clean(config.destination);
    const copyResult = await copy(config.source, config.destination);
    if (!copyResult) {
        error('Copy error !!');
        return false;
    }
    const watcher = chokidar.watch(config.source, { persistent: true }).on('ready', (...result) => {
        log('start------>>>', result);
        watcher.on('change', (filePath) => {
            log('[change]======>>>', filePath, path.resolve(filePath));
            copyFile(filePath, config.source, config.destination);
        });
        watcher.on('add', (filePath) => {
            success('[add]======>>>', filePath);
            copyFile(filePath, config.source, config.destination);
        });
        watcher.on('unlink', (filePath) => {
            error('[unlink]======>>>', filePath);
            deleteFile(filePath, config.source, config.destination);
        });
    });


    return watcher;
}

module.exports = {
    startWatch
}