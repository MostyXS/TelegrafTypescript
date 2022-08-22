import './extensions/array.extensions.js'
import './extensions/string.extensions.js'

;(async () => {
    const dotenv = await import('dotenv')
    dotenv.config()
    await import('./telegram/index.js')
})()
