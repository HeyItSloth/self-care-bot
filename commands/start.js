const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('debug command'),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor(255, 0, 0)
			.setTitle('Embed Title')
			.setURL('https://google.com')
			.setAuthor({ name: 'Sara', iconURL: 'https://i.imgur.com/2uJXh8n.png', url: 'https://twitch.tv/heyitsloth' })
			.setDescription('Embed description')
			.setThumbnail('https://i.imgur.com/2uJXh8n.png')
			.addFields(
				{ name: 'Field 1', value: 'Field 1 value', inline: true },
				{ name: 'Field 2', value: 'Field 2 value', inline: true },
				{ name: 'Field 3', value: 'Field 3 value' }
			)
			.setImage('https://i.imgur.com/2uJXh8n.png')
			.setTimestamp()
			.setFooter({ text: 'Footer', iconURL: 'https://i.imgur.com/2uJXh8n.png' });
		
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected!')
					.addOptions([
						{
							label:			'Select Me!',
							description:	'This is the first choice',
							value:			'first_option'
						},
						{
							label:			'Or me!',
							description:	'This is the 2nd choice',
							value:			'second_option'
						}
					])
			);

		await interaction.reply({embeds: [embed], components: [row]});
	}
};