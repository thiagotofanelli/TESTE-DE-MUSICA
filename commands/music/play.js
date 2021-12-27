const {
	MessageEmbed,
	Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
	name: "play", //the command name for the Slash Command

	category: "Music",
	aliases: ["p", "paly", "pley"],
	usage: "play <Search/link>",

	description: "Plays a Song/Playlist in your VoiceChannel", //the command description for Slash Command Overview
	cooldown: 2,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
			//console.log(interaction, StringOption)

			//things u can directly access in an interaction!
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = message;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
			if (!channel) return message.reply({
				embeds: [
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **𝘝𝘰𝘤𝘦 𝘱𝘳𝘦𝘤𝘪𝘴𝘢 𝘦𝘴𝘵𝘢𝘳 𝘤𝘰𝘯𝘦𝘤𝘵𝘢𝘥𝘰 𝘢 𝘶𝘮 𝘤𝘢𝘯𝘢𝘭 ${guild.me.voice.channel ? "__my__" : "𝘯𝘦"} 𝘢𝘯𝘪𝘮𝘢𝘭**`)
				],

			})
			if (channel.userLimit != 0 && channel.full)
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`🛰 𝘈𝘤𝘩𝘰 𝘲𝘶𝘦 𝘴𝘦𝘶 𝘤𝘢𝘯𝘢𝘭 𝘥𝘦 𝘷𝘰𝘻 𝘦𝘴𝘵𝘢 𝘮𝘶𝘪𝘵𝘰 𝘭𝘰𝘵𝘢𝘥𝘰, 𝘯𝘢𝘰 𝘵𝘦𝘮 𝘶𝘮 𝘦𝘴𝘱𝘢𝘤𝘪𝘯𝘩𝘰 𝘱𝘳𝘢 𝘮𝘪𝘮...`)
					],
				});
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`🛰 𝘑𝘢 𝘦𝘴𝘵𝘰𝘶 𝘴𝘦𝘯𝘥𝘰 𝘶𝘴𝘢𝘥𝘰, 𝘷𝘢𝘥𝘪𝘢.`)
					],
				});
			}
			if (!args[0]) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} 𝘥𝘪𝘨𝘪𝘵𝘦 𝘰 𝘯𝘰𝘮𝘦 𝘥𝘢 𝘮𝘶𝘴𝘪𝘤𝘢 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘫𝘢...`)
						.setDescription(`**𝘶𝘴𝘦 :**\n> \`${client.settings.get(message.guild.id, "prefix")}play <Search/Link>\``)
					],
				});
			}
			//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER
			const Text = args.join(" ") //same as in StringChoices //RETURNS STRING 
			//update it without a response!
			let newmsg = await message.reply({
				content: `🛰 𝘣𝘶𝘴𝘤𝘢𝘯𝘥𝘰, 𝘪𝘴𝘴𝘰 𝘱𝘰𝘥𝘦 𝘥𝘦𝘮𝘰𝘳𝘢𝘳 𝘶𝘮 𝘱𝘰𝘶𝘤𝘰... \`\`\`${Text}\`\`\``,
			}).catch(e => {
				console.log(e)
			})
			try {
				let queue = client.distube.getQueue(guildId)
				let options = {
					member: member,
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				await client.distube.playVoiceChannel(channel, Text, options)
				//Edit the reply
				newmsg.edit({
					content: `${queue?.songs?.length > 0 ? "🛰 𝐀𝐝𝐢𝐜𝐢𝐨𝐧𝐚𝐝𝐨!" :"🛰 𝐓𝐎𝐂𝐀𝐍𝐃𝐎 𝐀𝐆𝐎𝐑𝐀: "}: \`\`\`css\n${Text}\n\`\`\``,
				}).catch(e => {
					console.log(e)
				})
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
					content: `${client.allEmojis.x} | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],

				})
			}
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
