const { Client, ChatInputCommandInteraction,EmbedBuilder,ApplicationCommandOptionType
} = require("discord.js");

const status = (queue) => `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
module.exports = {
    name: "now_playing",
    description: "Current song playing",
    
   async execute(interaction, client)  {
        const queue = await client.distube.getQueue(interaction)
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "Please join a voice channel!", ephemeral: true })
        }
        if (!queue) {
            const queueError = new EmbedBuilder()
                .setDescription("There is Nothing Playing")
                .setColor("Blue")
            return interaction.reply({ embeds: [queueError] })
        }
        if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "You are not on the same voice channel as me!", ephemeral: true })
        }
        const song = queue.songs[0]
        const embed = new EmbedBuilder()
            .setDescription(`[${song.name}](${song.url})\n  ${status(queue).toString()}`)
            .addFields(
                { name: "Duration", value: `${queue.formattedCurrentTime} / ${song.formattedDuration}`, inline: true },
                { name: "Requested by", value: `${song.user}`, inline: true },
                { name: "Download", value: `[Link](${song.streamURL})`, inline: true },
              )
              .setThumbnail(song.thumbnail)
              .setFooter({ text: `Requested by ${song.user.username}`, iconURL: song.user.avatarURL() })
              .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}