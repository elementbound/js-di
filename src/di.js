const context = {}
let pending = []

class DeferredPromise {
    constructor() {
        let resolvePromise, rejectPromise
        let promise = new Promise((resolve, reject) => {
            resolvePromise = resolve
            rejectPromise = reject
        })

        this.resolve = resolvePromise
        this.reject = rejectPromise
        this.promise = promise
    }
}

const deferPromise = () => 
    new DeferredPromise()

const resolve = async component => 
    context[component] instanceof DeferredPromise ?
        await context[component].promise : 
        context[component]

module.exports = {
    define: (name, func) => {
        pending.push([name, func])
    },

    boot: () => {
        console.log('Pending components:', pending)

        pending.forEach(([name, func]) => 
            context[name] = deferPromise()
        )

        pending.forEach(([name, func]) => {
            console.log(`Pulling component ${name}`)

            func(resolve)
                .then(component => {
                    console.log(`Resolved component ${name}`)
                    context[name].resolve(component)
                    context[name] = component

                    console.log(context)
                })
        })

        pending = []
    },

    get: resolve
}