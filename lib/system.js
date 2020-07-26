const os = require('os');

const sysType = {
    windows: 'Windows_NT',
    mac: 'Darwin',
    linux: 'linux',
};

exports.getSystem = () => {
    return os.type();
}

exports.osReturn = () => {
    const systemType = os.type();
    const types = {
        [sysType.windows]: '\r\n',
        [sysType.mac]: '\r',
        [sysType.linux]: '\n'
    };
    return types[systemType];
}
