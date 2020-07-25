const Handlebars = require('handlebars');


exports.registerIfEq = () => {
    return Handlebars.registerHelper('if_eq', function (value, opts) {
        return value === 'aa'
            ? opts.fn(this)
            : opts.inverse(this)
    })
};
exports.registerTransformat = () => {
    return Handlebars.registerHelper('transformat', function (value, opts) {
        return new Handlebars.SafeString("<font color='pink'>通讯录信息</font>");
    });
};