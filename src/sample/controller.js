const di = require('../di.js')

di.define('controller', async resolve => {
    const service = await resolve('service')

    return () => {
        let data = service.getData()

        return JSON.stringify(data, undefined, 4)
    }
})