const { execSync } = require('child_process');

exports.getUser = () => {
    let name
    let email
    try {
        name = execSync('git config --get user.name');
        email = execSync('git config --get user.email');
    } catch (e) { }
    return (name && (name + '').trim() || '') + (email && `<${(email + '').trim()}>`.trim() || '');
}