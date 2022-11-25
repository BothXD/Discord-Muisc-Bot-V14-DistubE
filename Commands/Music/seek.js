const { Client, ChatInputCommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require("discord.js");

module.exports = {
    name: "seek",
    description: "Set the playing time to another positio",
    options: [
        {
            name: "amount",
            type: 10,
            description: "Time you want to jump to in seconds",
            required: true
        }
    ],

    async execute(interaction, client) {

        const args = interaction.options.getNumber("amount")
        const voiceChannel = interaction.member.voice.channel
        const queue = await client.distube.getQueue(interaction)
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
        const time = parseInt(args)
        if (!time) return interaction.reply({ content: "Please specify a time | Time in seconds." })
        if (time >= queue.songs[0].duration) return interaction.reply({ content: `Time < \`${queue.songs[0].duration} seconds\`` })
        client.distube.seek(interaction, Number(args))
        
        const embed = new EmbedBuilder()
            .setDescription(`Jump to \`${args} seconds time\``)
            .setColor("Blue")

        return interaction.reply({ embeds: [embed] })
    }
}