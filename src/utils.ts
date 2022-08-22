import fs from 'fs'

export const initializeJson = (path: string, object: Object) => {
    if(fs.existsSync(path)) return
    fs.writeFileSync(path, JSON.stringify(object), {flag: 'wx'})
} 