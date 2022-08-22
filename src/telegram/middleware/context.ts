import { Context, Scenes } from 'telegraf'
import { WizardContext } from 'telegraf/typings/scenes'

export interface MainSession extends Scenes.WizardSession {

}

export interface MainContext extends WizardContext {
    scene: Scenes.SceneContextScene<MainContext, Scenes.WizardSessionData>,
    session: MainSession, 
}
