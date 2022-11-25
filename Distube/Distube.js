const client = require("../Structures/index"); const ms = require("ms")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
const status = queue => `Volume: \`${queue.volume}%\` | \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\``

client.distube
.on('playSong', (queue, song) => queue.textChannel.send({ content: `:notes:**${song.name}** Added to popinQueue \`\`${song.formattedDuration}\`\``}))
.on('addSong', (queue, song) => queue.textChannel.send({ content: `🎵 Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}` }))
.on('addList', (queue, playlist) => queue.textChannel.send({ content: `🎼 Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}` }))
.on('error', (channel, e) => { channel.send({ content: `⛔ | An error encountered: ${e}` }) })
.on('empty', (queue) => queue.textChannel.send({ content: `🔇 Voice channel is empty! Leaving the channel...` }))
.on('searchNoResult', (message) => message.channel.send({ content: `🔍| No result found for` }))
.on('finish', (queue) => queue.textChannel.send({ content: `🍀 Queue finished, leaving the channel` }))
