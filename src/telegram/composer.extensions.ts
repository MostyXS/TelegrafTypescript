import { Composer } from 'telegraf'


declare module 'telegraf' {
    interface Composer<C extends Context> {
        safeCommand: (
            this: Composer<C>,
            command: string,
            callback: (ctx: C) => any
        ) => Composer<C>
    }
}

Composer.prototype.safeCommand = function (this, command, callback) {
    this.command(command, async (ctx) => {

        try {
            await callback(ctx)
        } catch (e) {
            await ctx.reply('Unable to execute command: ' + e.message)
        }
    })
    return this
}