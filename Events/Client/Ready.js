const { Client, ActivityType } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "ready",

   /**
    * @param {Client} client 
    * @param {ActivityType} type
    */

    async execute(client) {
        
        /**
         * @client loging Successfully
         * console.log(`${user.tag} is now online!`)
         */
        const { user, ws } = client; console.log(`${user.tag} is now online!`)

        /**
         * @client ActivityStatus 
         */
        setInterval(() => { const ping = ws.ping;
        user.setActivity({ name: `Ping: ${ping} ms`, type: ActivityType.Watching, }) }, ms("5s"))

    }
}