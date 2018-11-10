const di = require('../di.js')

di.define('service', async resolve => {
    const dao = await resolve('dao')

    return {
        getData: () => ({
            success: true,
            message: dao.query()
        })
    }
})