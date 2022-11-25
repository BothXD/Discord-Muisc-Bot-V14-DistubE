const { Client } = require("discord.js")
const mongoose = require("mongoose"); const mongo = process.env.DATABASE

module.exports = {
    name: "ready",
    
    async execute(client) {
        
        if (!mongo) return
        mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true
        }).then(() => { console.log("🔹 Database Connected!") }).catch(err => console.log(err))
    }
}