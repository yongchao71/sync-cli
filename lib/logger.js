const chalk = require('chalk')
const { format } = require('util')
const config = require('../config/config.json')

const project = config.project
const separator = config.separator

function log(...params) {
    const msg = format.apply(format, params)
    console.log(chalk.white(`[${project}] ${separator} `), msg)
}

function error(...params) {
    if (params[0] instanceof Error) params[0] = params[0].message.trim()
    const msg = format.apply(format, params)
    console.error(chalk.red(`[${project}] ${separator} `), msg)
}

function success(...params) {
    const msg = format.apply(format, params)
    console.log(chalk.green(`[${project}] ${separator} `), msg)
}

module.exports = {
    log,
    error,
    success
};
