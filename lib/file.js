const fsSync = require('fs-sync');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');

async function clean(filePath) {
    if (!filePath || !fsSync.exists(filePath)) {
        return false;
    }
    const cleanPrompt = await inquirer.prompt([{
        type: 'confirm',
        name: "delete",
        message: `确认要清空 (${filePath}) 所有文件？`
    }])
    console.log('cleanPrompt=====>>>', cleanPrompt);
    if (cleanPrompt.delete) {
        rimraf.sync(filePath);
        return true;
    }
    return false;
}

async function copy(source, destination, force = true) {
    return fsSync.copy(source, destination, { force }) || true;
}

async function copyFile(fileName, source, destination) {
    if (!!!source || !!!destination || !!!fileName) {
        return false;
    }
    source = path.resolve(source);
    destination = path.resolve(destination);
    const destinationPath = fileName.replace(source, destination);
    if (fsSync.exists(destinationPath)) {
        fsSync.remove(destinationPath);
    }
    return fsSync.copy(fileName, destinationPath) || true;
}

async function deleteFile(fileName, source, destination) {
    if (!!!source || !!!destination || !!!fileName) {
        return;
    }
    source = path.resolve(source);
    destination = path.resolve(destination);
    const destinationPath = fileName.replace(source, destination);
    // return fsSync.remove(destinationPath);
    const removeResult = fsSync.exists(destinationPath) ? fsSync.remove(destinationPath) : false;
    const baseDir = path.dirname(destinationPath);
    if (fsSync.exists(baseDir)) {
        const childrenFile = fs.readdirSync(baseDir);
        if (childrenFile.length <= 0) {
            fsSync.remove(baseDir)
        }
    }
    return removeResult;
}

module.exports = {
    clean,
    copy,
    copyFile,
    deleteFile
};
