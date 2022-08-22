import { Composer } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { CommandName } from "../types.js";
import { getAdmins } from "./controller.js";


export const adminsComposer = new Composer<WizardContext>()

adminsComposer.safeCommand(CommandName.AdminsList, async ctx => {
    const admins = getAdmins()
    await ctx.reply(admins.join('\n'))
}).command(CommandName.AdminsAdd, async ctx => {
    await ctx.enterInput(CommandName.AdminsAdd)
}).command(CommandName.AdminsRemove, async ctx => {
    await ctx.enterInput(CommandName.AdminsRemove)
})