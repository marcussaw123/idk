const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('../../models/Guild')
module.exports = class RafflecheckCommand extends BaseCommand {
  constructor() {
    super('rafflekick', 'Raffle', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You have no Permission")
    let member = message.mentions.users.first()
    if(!member) return message.channel.send("You need to mention someone!")
    let data = await db.findOne({guildID: message.guild.id});
    if(!data) return message.channel.send("Data Not Found!")
    if(data.isStart == false) return message.channel.send("No raffle found!")
    let arr = data.raffle
    arr = arr.filter((e) => e !== member.id);
    await db.findOneAndUpdate({guildID: message.guild.id, raffle: arr})
    message.channel.send("Success")
    member.send(`${message.author} has kicked you out of the raffle!`)
  }
}