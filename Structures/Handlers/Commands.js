const { Perms } = require("../Validation/Permissions")
const { Client } = require("discord.js")
const ms = require("ms")

module.exports = async (client, PG, Ascii) => {

    const Table = new Ascii("Commands Loaded")
    CommandsArray = []
    const CommandFiles = await PG(`${process.cwd()}/Commands/*/*.js`)

    CommandFiles.map(async (file) => {
        const command = require(file)

        if (!command.name) return Table.addRow(file.split("/")[7], "🔸 FAILED", "Missing A Name")
        if (!command.context && !command.description) return Table.addRow(command.name, "🔸 FAILED", "Missing A Description")

        if (command.UserPerms)
        if (command.UserPerms.every(perms => Perms.includes(perms))) command.default_member_permissions = true 
        else return Table.addRow(command.name, "🔸 FAILED", "User Permission Is Invalid")

        client.commands.set(command.name, command)
        CommandsArray.push(command)

        await Table.addRow(command.name, "🔹 SUCCESSFUL")

    })
    
    console.log(Table.toString())
    client.on("ready", () => {
        client.application.commands.set(CommandsArray).then(cmds => { cmds.toJSON().forEach(cmd => client.slashData.set(cmd.name, cmd)) })
    })
}

