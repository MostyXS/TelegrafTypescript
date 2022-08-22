import { Context } from 'telegraf'
import { WizardContext } from 'telegraf/typings/scenes/index.js'
import { CommandName, SceneName } from '../types.js'
import { getInputCommand } from './controller.js'
import { InputState } from './types.js'

declare module 'telegraf' {
    interface Context {
        enterInput: (this, command: CommandName) => any
    }
}

Context.prototype.enterInput = async function (
    this: WizardContext,
    commandName
) {
    const inputCommand = getInputCommand(commandName)
    const inputState: InputState = {
        previousSceneId: this.scene.session.current || undefined,
        currentStep: 0,
        //TODO refactor steps location
        steps: inputCommand.steps,
        command: commandName,
    }
    await this.scene.enter(SceneName.Input, inputState)
}
