const { Client, ChatInputCommandInteraction,EmbedBuilder, ApplicationCommandOptionType
} = require("discord.js");

module.exports = {
    name: "pause",
    description: "Pauses the currently playing track",
    
    async execute(interaction, client) {

        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        
        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        if (!queue) {
            // const queueError = EmbedBuilder()
            //     .setDescription(":no_entry_sign: There must be music playing to use that!")
            //     .setColor("Red")
                
            return interaction.reply({ content: `:no_entry_sign: There must be music playing to use that!`/*embeds: [queueError]*/ })
        }
        if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "You are not on the same voice channel as me!", ephemeral: true })
        }
        try {
            await client.distube.pause(interaction)
            await interaction.reply("***Paused the current track***")
            const message = await interaction.fetchReply()
            await message.react("⏸")
        } catch {
            interaction.reply({ content: " The queue has been paused already", ephemeral: true })
        }
    }
}