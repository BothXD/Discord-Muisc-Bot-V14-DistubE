const { Client, ChatInputCommandInteraction,EmbedBuilder,ApplicationCommandOptionType
} = require("discord.js")

module.exports = {
    name: "repeat",
    description: "Loops throught current song",
   
    async execute(interaction, client) {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: `❌ Please join a voice channel!`, ephemeral: true })
        }
        if (!queue) {
            const queueError = new EmbedBuilder()
                .setDescription(`❌  There is Nothing Playing`)
                .setColor("Red")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: `❌ You are not on the same voice channel as me!` , ephemeral: true })
        }
        let mode = client.distube.setRepeatMode(interaction)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        return interaction.reply(`✅ Set repeat mode to **` + mode + `**`)
    }
}