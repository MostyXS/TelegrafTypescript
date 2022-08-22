import { Composer, Markup, Scenes } from 'telegraf'
import { InputContext } from './context.js'
import { getInputCommand } from './controller.js'
import { SceneName } from '../types.js'

//May be create input steps with wizard scene
//Problem with input context
export const inputComposer = new Composer<InputContext>()
//#region Composer

const handleInput = async (ctx: InputContext, stepContent: string) => {
    const inputState = ctx.scene.session.state
    inputState.steps[inputState.currentStep] = stepContent
    inputState.currentStep++
    if (inputState.steps.length !== inputState.currentStep)
        return ctx.reply(`Input ${inputState.steps[inputState.currentStep]}`)
    try {
        const command = getInputCommand(inputState.command)
        await command.execute(ctx, inputState.steps)
        await ctx.reply('Input execution success')
    } catch (e) {
        await ctx.reply('Input execution failed.\n' + e)
    }
    if (inputState.previousSceneId) ctx.scene.enter(inputState.previousSceneId)
}
// inputComposer.on('document', async (ctx) => {
//     const fileUrl = await ctx.telegram.getFileLink(ctx.message.document.file_id)
//     const file = await axios.get(fileUrl.toString())
//     await handleInput(ctx, file.data)
// })

inputComposer.on('text', async (ctx) => {
    await handleInput(ctx, ctx.message.text)
})
//#endregion
export const inputScene = new Scenes.WizardScene<InputContext>(
    SceneName.Input,
    inputComposer
)

inputScene.enter(async (ctx) => {
    await ctx.replyMain(
        `Input ` + ctx.scene.session.state.steps[0],
        Markup.inlineKeyboard([Markup.button.callback('Cancel', 'cancel')])
    )
})

inputScene.action('cancel', async (ctx) => {
    ctx.scene.enter(ctx.scene.session.state.previousSceneId)
})
