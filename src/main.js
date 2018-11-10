const di = require('./di.js')

const main = async () => {
    // Pull components
    ['controller', 'dao', 'service'].forEach(
        name => require(`./sample/${name}.js`)
    )

    di.boot()
}

main()