const di = require('../di.js')

di.define('dao', async resolve => ({
    query: () => 
        'Hi!'
}))