const {
	MessageEmbed,
	Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const {
	check_if_dj
} = require("../../handlers/functions")
module.exports = {
	name: "playskip", //the command name for the Slash Command

	category: "Music",
	aliases: ["ps"],
	usage: "playskip <Search/link>",

	description: "Plays a Song/Playlist and skips!", //the command description for Slash Command Overview
	cooldown: 2,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
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
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **Please join ${guild.me.voice.channel ? "__my__" : "a"} VoiceChannel First!**`)
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
						.setDescription(`**Usage:**\n> \`${client.settings.get(message.guild.id, "prefix")}playskip <Search/Link>\``)
					],
				});
			}
			//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER
			const Text = args.join(" "); //same as in StringChoices //RETURNS STRING 
			//update it without a response!
			let newmsg = await message.reply({
				content: `🛰 𝘣𝘶𝘴𝘤𝘢𝘯𝘥𝘰, 𝘪𝘴𝘴𝘰 𝘱𝘰𝘥𝘦 𝘥𝘦𝘮𝘰𝘳𝘢𝘳 𝘶𝘮 𝘱𝘰𝘶𝘤𝘰...  \`\`\`${Text}\`\`\``,
			}).catch(e => {
				console.log(e)
			})
			try {
				let queue = client.distube.getQueue(guildId)
				let options = {
					member: member,
					skip: true
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				if (queue) {
					if (check_if_dj(client, member, queue.songs[0])) {
						return message.reply({
							embeds: [new MessageEmbed()
								.setColor(ee.wrongcolor)
								.setFooter(ee.footertext, ee.footericon)
								.setTitle(`${client.allEmojis.x} **You are not a DJ and not the Song Requester!**`)
								.setDescription(`**DJ-ROLES:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
							],
						});
					}
				}
				await client.distube.playVoiceChannel(channel, Text, options)
				//Edit the reply
				newmsg.edit({
					content: `${queue?.songs?.length > 0 ? "🛰⏭ 𝐏𝐔𝐋𝐀𝐍𝐃𝐎 𝐏𝐀𝐑𝐀:" : "🛰 𝐓𝐎𝐂𝐀𝐍𝐃𝐎 𝐀𝐆𝐎𝐑𝐀"}: \`\`\`css\n${Text}\n\`\`\``,
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
