const BaseCommand = require("../../utils/structures/BaseCommand");
const db = require("../../models/Guild");
let holder = ''
const { MessageCollector } = require("discord.js-collector");
module.exports = class RafflestartCommand extends BaseCommand {
  constructor() {
    super("rafflestart", "Raffle", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You have no Permission");
      let data = await db.findOne({guildID: message.guild.id})
      if(!data) return message.channel.send("Data Not Found!")
      if(data.isStart == true) return message.channel.send("There is already a raffle going on.")
      const botMessage = await message.channel.send("What are the requirements? Type `none` if no requirement.");
      const userMessage = await MessageCollector.asyncQuestion({
        botMessage,
        user: message.author.id,
      });
      if(userMessage.content == userMessage.content) {
        await db.findOneAndUpdate({guildID: message.guild.id, Req: userMessage.content})
        holder = 'filled'
      }
      if(holder === 'filled') {
       const botMessage = await message.channel.send(
         "How many entries do you want?"
       );
       const userMessage = await MessageCollector.asyncQuestion({
         botMessage,
         user: message.author.id,
       });
       if(isNaN(userMessage.content)) return message.channel.send("Needs to be a number redo the command.")
       await db.findOneAndUpdate({guildID: message.guild.id, Limit: parseInt(userMessage.content)})
      }
      await db.findOneAndUpdate({guildID: message.guild.id, isStart: true})
      message.channel.send("Raffle has started!")

  }
};
