const BaseCommand = require("../../utils/structures/BaseCommand");
const db = require("../../models/Guild");
module.exports = class RaffleaddCommand extends BaseCommand {
  constructor() {
    super("raffleadd", "Raffle", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You have no Permission");
    let data = await db.findOne({ guildID: message.guild.id });
    if (!data) return message.channel.send("Data Not Found");
    if (data.isStart == false)
      return message.channel.send("Raffle not found start one");
    let arr = data.raffle;
    let member = message.mentions.users.first();
    if (!member) return message.channel.send("Mention someone");
    arr.push(member.id);
    await db.findOneAndUpdate({ guildID: message.guild.id, raffle: arr });
    member.send(`${message.author} has added you to the raffle`);t
    message.channel.send("That user has been added to the raffle!");
  }
};
