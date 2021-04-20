const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('../../models/Guild')
const { MessageCollector } = require("discord.js-collector");
module.exports = class RafflejoinCommand extends BaseCommand {
  constructor() {
    super('rafflejoin', 'Raffle', []);
  }

  async run(client, message, args) {
    let data = await db.findOne({guildID: message.guild.id})
    let users = data.raffle
    if(!data) return message.channel.send("Data Not Found")
    if(data.Limit < users.lenght) return message.channel.send("The limit for this raffle has exceeded the limit")
    if(data.isStart == false) return message.channel.send("No raffles found!")
    if(data.Req == 'None' || data.Req == 'none') {
      users.push(message.author.id)
      message.channel.send("You have joined the raffle")
      await db.findOneAndUpdate({guildID: message.guild.id, raffle: users})
    } else {
      
        message.channel.send(`Type pls give <@456811056090578975> ${data.Req}. \n Might take a while to verify that you have send it.`)
      
      let cha = client.channels.cache.get("828933642699931679");
      cha.send(`Waiting for approval ${message.author} wants the raffle. \n Execute the command %raffleadd ${message.author}`)


    }
  }
}