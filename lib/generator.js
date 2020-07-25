const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync

exports.generator = (metadata, src, dest = '.') => {
    if (!src) {
        return Promise.reject(new Error(` error source：${src}`))
    }
    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                console.log();
                console.log('1111------>', meta);
                console.log();
                console.log('files------>', done);
                Object.keys(files).forEach(fileName => {
                    console.log(fileName);
                    const text = files[fileName].contents.toString();
                    files[fileName].contents = new Buffer(Handlebars.compile(text)(meta))
                })
                // resolve('ok');
                done()
            }).build(err => {
                // rm(src)
                err ? reject(err) : resolve('build')
            })
    })
}