import { CommandName } from '../types.js'
import { InputCommand } from './types.js'
import * as admins from '../admins/controller.js'

const InputCommands: {
    [name in CommandName]?: InputCommand
} = {
    admins_add: {
        steps: ['adminId'],
        execute: (ctx, args) => {
            const adminId = Number(args[0])
            if (!adminId) throw new Error('Invalid id')
            admins.addAdmin(adminId)
        },
    },
    admins_remove: {
        steps: ['adminId'],
        execute: (ctx, args) => {
            const adminId = Number(args[0])
            if (!adminId) throw new Error('Invalid id')
            admins.removeAdmin(adminId)
        },
    },
    
}

export const getInputCommand = (command: CommandName): InputCommand =>
    InputCommands[command]
