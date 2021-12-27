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
	name: "skip", //the command name for the Slash Command

	category: "Music",
	aliases: ["s"],
	usage: "skip",

	description: "Skips the Current Track", //the command description for Slash Command Overview
	cooldown: 5,
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
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **𝘝𝘰𝘤𝘦 𝘱𝘳𝘦𝘤𝘪𝘴𝘢 𝘦𝘴𝘵𝘢𝘳 𝘤𝘰𝘯𝘦𝘤𝘵𝘢𝘥𝘰 𝘢 𝘶𝘮 𝘤𝘢𝘯𝘢𝘭 ${guild.me.voice.channel ? "my" : "𝘯𝘦"} 𝘢𝘯𝘪𝘮𝘢𝘭.**`)
				],

			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} 𝘝𝘦𝘯𝘩𝘢 𝘢𝘵𝘦 𝘮𝘪𝘮 𝘱𝘢𝘳𝘢 𝘲𝘶𝘦 𝘦𝘶 𝘳𝘦𝘢𝘭𝘪𝘻𝘦 𝘴𝘦𝘶𝘴 𝘥𝘦𝘴𝘦𝘫𝘰𝘴...`)
						.setDescription(`<#${guild.me.voice.channel.id}>`)
					],
				});
			}
			try {
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x}🛰 𝘝𝘰𝘤𝘦 𝘦𝘴𝘵𝘢 𝘮𝘦 𝘦𝘴𝘤𝘶𝘵𝘢𝘯𝘥𝘰 𝘵𝘰𝘤𝘢𝘳 𝘢𝘭𝘨𝘶𝘮𝘢 𝘤𝘰𝘪𝘴𝘢? 𝘢𝘯𝘵𝘢`)
					],
				})
				if (check_if_dj(client, member, newQueue.songs[0])) {
					return message.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} **You are not a DJ and not the Song Requester!**`)
							.setDescription(`**DJ-ROLES:**\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
					});
				}
				await newQueue.skip();
				message.reply({
					embeds: [new MessageEmbed()
					  .setColor(ee.color)
					  .setTimestamp()
					  .setTitle(`🛰⏭ 𝐏𝐔𝐋𝐀𝐍𝐃𝐎 𝐏𝐀𝐑𝐀 𝐎 𝐏𝐑𝐎𝐗𝐈𝐌𝐎 𝐒𝐎𝐌!`)
					  .setFooter(`💢 𝐶𝑜𝑚𝑎𝑛𝑑𝑜 𝑒𝑓𝑒𝑡𝑢𝑎𝑑𝑜 𝑝𝑜𝑟: ${member.user.tag}`, member.user.displayAvatarURL({dynamic: true}))]
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
