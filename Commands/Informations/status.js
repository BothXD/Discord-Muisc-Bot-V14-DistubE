const { Client, ChatInputCommandInteraction, EmbedBuilder, UserFlags, version } = require("discord.js")
const { connection } = require("mongoose")
const os = require("os")
require("../../Events/Client/Ready")

module.exports = {
    name: "status",
    description: "Displays the current status of the bot",

    async execute(interaction, client) {

        let connectedchannelsamount = 0;
        let guilds = client.guilds.cache.map((guild) => guild);
        for (let i = 0; i < guilds.length; i++) {
            if (guilds[i].members.me.voice.channel) connectedchannelsamount += 1;
        }

        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        const Response = new EmbedBuilder()
            .setColor("Aqua")
            .setTitle("STATUS")
            .addFields([
                { name: `Client:`, value: `\` 🟢 ONLINE \``, inline: true },
                { name: `Speed:`, value: `\` 📈 ${client.ws.ping}ms \``, inline: true },
                { name: `Database:`, value: `\`${switchTo(connection.readyState)} \``, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Memory:`, value: `\` 💳 ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}% \``, inline: true },
                { name: "CPU Speed:", value: `\` 🚄 ${os.cpus()[0].speed} MHz \``, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: false },
                { name: `\u200B`, value: `\`Uptime\` <t:${parseInt(client.readyTimestamp / 1000)}> - 🆙 <t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false },
                { name: "\u200B", value: `\`${days}\`days \`${hours}\`hours \`${minutes}\`minutes \`${seconds}\`seconds`, inline: true },
                { name: "☑ Verified", value: client.user.flags & UserFlags.VerifiedBot ? `\` Yes \`` : `\` No \``, inline: true },
                { name: "🖥 System", value: os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS"), inline: true },
                { name: "🧠 CPU Model", value: `${os.cpus()[0].model}`, inline: false },
                { name: `\u200B`, value: `\u200B`, inline: false },
                { name: "Total Server", value: `\` ➕ ${client.guilds.cache.size}  \``, inline: true },
                { name: `Total member:`, value: `\` 👤 ${client.users.cache.size}  \``, inline: true },
                { name: "Discord.js", value: `\`  ${version}  \` `, inline: true },
                { name: "Node.js", value: `\`  ${process.version}  \` `, inline: true },
                { name: `Connected`, value: `\` 🎤 ${connectedchannelsamount}  \``, inline: true },
                { name: `Licence`, value: `<@${process.env.DEVOLOPER}>`, inline: true },
            ])

        return interaction.reply(({ embeds: [Response] }))
    }
}

function switchTo(val) {
    var status = " "
    switch (val) {
        case 0: status = `🔴 DISCONNECTED`
            break;
        case 1: status = `🟢 CONNECTED`
            break;
        case 2: status = `🟡 CONNECTING`
            break;
        case 3: status = `🟠 DISCONNECTING`
            break;
    }
    return status
}