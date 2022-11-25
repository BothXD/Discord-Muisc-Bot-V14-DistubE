const { Client, ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require("discord.js")

module.exports = {
    name: "volume",
    description: "Change the music player's volume.",
    options: [
        {
            name: "amount",
            type: ApplicationCommandOptionType.Number,
            description: "Percentage of the audio volume",
            required: true
        }
    ],
    
    async execute(interaction, client) {

        const args = interaction.options.getNumber("amount")
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel

        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new Discord.EmbedBuilder()
                .setDescription("There is Nothing Playing")
                .setColor("Red")

            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "You are not on the same voice channel as me!", ephemeral: true })
        }
        const volume = parseInt(args)
        if (volume < 1 || volume > 100) {
            return interaction.reply({ content: "Please enter a valid number (between 1 and 100)", ephemeral: true })
        }
        await client.distube.setVolume(interaction, volume)
        
        await interaction.reply(`Set the new volume to \`${volume}%\`.`)
        
    }
}