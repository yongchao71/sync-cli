const ora = require('ora');
const chalk = require('chalk');
const commander = require('commander');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows--->';
    spinner.stop();
    console.log(chalk.green('loading success'));
}, 4000);
commander
    .version(require('./package').version)
    .usage('<command> [options]');
const testIndex = () => {
    console.log('this is test index');
};
module.exports = {
    testIndex
};