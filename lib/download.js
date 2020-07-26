const download = require('download-git-repo');
const path = require('path');
const ora = require('ora');
const cmd = require('./cmd');



exports.download = (repo, target = '.') => {
    const spinner = ora('downloading template');
    spinner.start();
    if (typeof (repo) !== typeof ('')) {
        throw new Error('repo is necessary!!');
    }
    const repoUrl = repo.split('#')[0];
    const branch = repo.split('#')[1] || 'master';

    const args = [
        'clone',
        '--depth',
        '1',
        '-b',
        branch,
        '--',
        repoUrl,
        target
    ];
    return new Promise((resolve, reject) => {
        cmd.spawnProcess('git', args, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(target);
            }
            spinner.stop();
        });

    });
}