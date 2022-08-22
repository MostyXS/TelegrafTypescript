import { Context } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'

//Somewhy session mainMessageId is not saved
//THIS IS A CRUTCH
let mainMessageId = undefined

declare module 'telegraf' {
    interface Context {
        replyMain: (
            this: Context,
            text: string,
            extra?: ExtraReplyMessage
        ) => Promise<any>
    }
}

Context.prototype.replyMain = async function (this, text, extra) {
    try {
        await this.deleteMessage(mainMessageId)
    } catch (e) {
        console.log(e)
    }
    const message = await this.reply(text, extra)
    mainMessageId = message.message_id
}
