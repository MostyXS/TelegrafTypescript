import { Composer, Scenes } from "telegraf";
import { BotCommand } from "telegraf/typings/core/types/typegram";
import { AdminCommands } from "./admins/commands.js";
import { adminsComposer } from "./admins/composer.js";
import { inputScene } from "./input/index.js";
import './input/context.extensions.js'


export const allScenes = new Scenes.Stage<any>([inputScene])

export const allCommands: BotCommand[] = AdminCommands.concat()

export const allComposers = new Composer(adminsComposer)

