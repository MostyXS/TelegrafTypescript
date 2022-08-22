import fs from 'fs'


const CONFIG_PATH = './configs/admins.json'
interface AdminsJSON {
    ownerId: number
    admins: number[]
}

const readAdmins = (): AdminsJSON =>
    JSON.parse(fs.readFileSync(CONFIG_PATH).toString())
const writeAdmins = (newSettings: AdminsJSON) =>
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(newSettings))

export const getOwnerId = () => readAdmins().ownerId

export const getAdmins = () => readAdmins().admins

//Check if user id is in admins list
export const addAdmin = (adminId: number) => {
    let config = readAdmins()
    config.admins.push(adminId)
    writeAdmins(config)
}

export const removeAdmin = (adminId: number) => {
    let config = readAdmins()
    config.admins = config.admins.filter((id) => id !== adminId)
    writeAdmins(config)
}
