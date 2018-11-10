const context = {}
let pending = []

const deferPromise = () => {
    let resolvePromise, rejectPromise
    let promise = new Promise((resolve, reject) => {
        resolvePromise = resolve
        rejectPromise = reject
    })

    return {
        resolve: resolvePromise,
        reject: rejectPromise,
        promise
    }
}

module.exports = {
    define: (name, func) => {
        pending.push([name, func])
    },

    boot: () => {
        console.log('Pending components:', pending)

        let promises = {}
        const resolve = name => 
            promises[name]

        pending.forEach(([name, func]) => 
            promises[name] = deferPromise()
        )

        pending.forEach(([name, func]) => {
            console.log(`Pulling component ${name}`)

            func(resolve)
                .then(component => {
                    console.log(`Resolved component ${name}`)
                    context[name] = component
                    promises[name].resolve(component)
                })
        })

        prending = []
    },

    context
}