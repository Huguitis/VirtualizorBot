const aoijs = require("aoi.js")
const setting = require("./settings.js")

const bot = new aoijs.AoiClient({
token: setting.BotToken,
prefix: setting.BotPrefix,
intents: "all", 
database: {
  db: require("dbdjs.db"),
  type: "dbdjs.db",
  path: "./Database/",
  tables: ["VirtualizorBot"],
}
})

bot.onMessage()
bot.onInteractionCreate()

const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./src/")

bot.variables({
BotPrefix: setting.BotPrefix,
SuccessEmoji: setting.SuccessEmoji,
ErrorEmoji: setting.ErrorEmoji,
InfoEmoji: setting.InfoEmoji,

VirtualizorApiKey: "None",
VirtualizorApiPass: "None",
VirtualizorPanelUrl: "None"
})