const { Client, Partials, Collection } = require("discord.js")
const ms = require("ms")
const { DisTube } = require('distube') 
const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require("@distube/yt-dlp")
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")
require("dotenv").config()
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials

const client = new Client({
    intents: 131071,
    partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
    allowedMentions: { parse: ["everyone", "users", "roles"] },
    rest: { timeout: ms("1m") }
})


client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new YtDlpPlugin({ update: false }), new SpotifyPlugin({ parallel: true, emitEventsAfterFetching: false,
        api: { clientId: "731ac5bf0603411f80ac446f5c02e290", clientSecret: "cd16a34c385b4fa5915abd596fd4e480",
    },})]
});


client.colorO = "#5e5bf7"; client.colorR = "#0b8519";
client.colorW = "#b41c1d"; client.colorE = "#f76d4b";


client.commands = new Collection(); 
client.slashData = new Collection();

const Handlers = ["Events", "Errors", "Commands"]
Handlers.forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
}); require("../Structures/Handlers/Events_Music")(client)


module.exports = client
client.login(process.env.DISCORD_TOKEN)
