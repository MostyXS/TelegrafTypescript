import { Context } from 'telegraf'
import { CommandName } from '../types'

export interface InputState {
    previousSceneId: string
    currentStep: number
    steps: string[]
    command: CommandName
}

export interface InputCommand {
    steps: string[]
    execute: (ctx: Context, args: string[]) => any
}
