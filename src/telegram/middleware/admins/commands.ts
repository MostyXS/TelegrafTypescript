import { BotCommand } from "telegraf/typings/core/types/typegram";
import { CommandName } from "../types.js";

export const AdminCommands: BotCommand[] = [
    {
        command: CommandName.AdminsList,
        description: 'List all admins',
    },
    {
        command: CommandName.AdminsAdd,
        description: 'Adds admin',
    },
    {
        command: CommandName.AdminsRemove,
        description: 'Removes admin',
    },
]