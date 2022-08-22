import { Context, Scenes } from 'telegraf'
import { WizardContextWizard } from 'telegraf/typings/scenes'
import { InputState } from './types.js'

export interface InputSessionData extends Scenes.WizardSessionData {
    state: InputState
}
export interface InputContext extends Context {
    scene: Scenes.SceneContextScene<InputContext, InputSessionData>
    wizard: WizardContextWizard<InputContext>
}
