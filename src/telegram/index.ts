import { Telegraf, Scenes } from 'telegraf'
import './composer.extensions.js'
import './context.extensions.js'
import { allCommands, allComposers, allScenes } from './middleware/index.js'
import { getAdmins, getOwnerId } from './middleware/admins/controller.js'
import RedisSession from 'telegraf-session-redis'

//Connection to client
export const bot = new Telegraf<Scenes.WizardContext>(
    process.env.TELEGRAM_API_TOKEN
)
const session = new RedisSession({
    store: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
    },
})

const hasAccess = (id: number) => getOwnerId() === id || getAdmins().includes(id)
bot.use((ctx, next) => {
    if (!hasAccess(ctx.from.id))
        return ctx.reply('You are not allowed to use this bot')
    next()
})
bot.use(session.middleware())


bot.use(allScenes).use(allComposers)

bot.start(async (ctx) => {
    await ctx.telegram.setMyCommands(allCommands)
    await ctx.reply('Welcome to the bot')
})

bot.launch().then(() => {
    console.log('Connected to telegram api')
})
