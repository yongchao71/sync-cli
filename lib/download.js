const download = require('download-git-repo');
const path = require('path');
const ora = require('ora');
const cmd = require('./cmd');


exports.download = (target) => {
    const spinner = ora('downloading template')
    spinner.start()
    // target = path.join(target || '.', '.download-temp');
    console.log('target----->>>', target);
    return cmd('https://github.com/yongchao71/sync-cli.git#master', target, {});
}
// exports.download = (target) => {
//     const spinner = ora('downloading template')
//     spinner.start()
//     // target = path.join(target || '.', '.download-temp');
//     console.log('target----->>>', target);
//     return new Promise((resolve, reject) => {
//         download('https://github.com/yongchao71/sync-cli.git#master',
//         // download('git@github.com:yongchao71/sync-cli.git#master',
//         // download('yongchao71/sync-cli.git#master',
//             target, { clone: true }, (err) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(target)
//                 }
//                 spinner.stop()
//             })
//     }).catch(error => {
//         console.error(error);
//     });
// }