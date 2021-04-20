const BaseCommand = require("../../utils/structures/BaseCommand");
const db = require("../../models/Guild");
module.exports = class RaffleendCommand extends BaseCommand {
  constructor() {
    super("raffleend", "Raffle", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You have no Permission");
    
    let data = await db.findOne({ guildID: message.guild.id });
    
    if (!data) return message.channel.send("Data not found");
    if(data.isStart == false) return message.channel.send("No raffle to end")
    let users = data.raffle;
    let randomValue = users[Math.floor(Math.random() * users.length)];
    if(users.lenght == 0) return message.channel.send("Nobody enter the raffle cannot pick winner.")
    message.channel.send(`Congrats! <@${randomValue}> has won the raffle.`)
    await db.findOneAndUpdate({guildID: message.guild.id, raffle: []})
    await db.findOneAndUpdate({guildID: message.guild.id, isStart: false})

  }
};
