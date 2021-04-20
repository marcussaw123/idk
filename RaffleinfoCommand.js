const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const db = require("../../models/Guild");
module.exports = class RafflecountCommand extends BaseCommand {
  constructor() {
    super("raffleinfo", "Raffle", []);
  }

  async run(client, message, args) {
    let data = await db.findOne({ guildID: message.guild.id });
    if (!data) return message.channel.send("No Data Found");
    if (data.isStart == false) return message.channel.send("No raffle found");
    let arr = data.raffle;
    const embed = new MessageEmbed()
      .setTitle("Raffle Game")
      .setDescription(
        `User Entered: \`${arr.length}\` \n Requirements: \`${data.Req}\` \n Limit: \`${data.Limit}\``
      )
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.username}`);
    message.channel.send(embed);
  }
};
