const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const { Sequelize, DataTypes } = require('sequelize');
const chalk = require('chalk');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    console.log(chalk.yellow(`>> Initializing ${file}...`));
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
console.log(chalk.green(`> Completed command init.`))

client.buttons = new Collection();
const buttonFiles = fs.readdirSync(`./buttons`).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
    console.log(chalk.yellow(`>> Initializing ${file}...`));
    const button = require(`./buttons/${file}`);
    client.buttons.set(button.data, button);
}

const sequelize = new Sequelize('database', 'user', 'password', {
    host:       'localhost',
    dialect:    'sqlite',
    logging:    false,
    storage:    'database.sqlite'
});

const Reminders = sequelize.define('reminders', {
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    reminders: {
        type: DataTypes.JSON,
        allowNull: true
    }
})

client.once('ready', () => {
    client.user.setActivity({
        name: "my friends be healthy | ❤️",
        type: "WATCHING"
    });

    Reminders.sync({ force: false });

    const d = new Date();
    let init = Date.now();
    console.log(chalk.blueBright(`> Bot ready, initialization complete at ${d.toLocaleString(init)}`));
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply(`Something went wrong!`);
    };
});

client.on('interactionCreate', interaction => {
	if (!interaction.isSelectMenu()) return;
	console.log(interaction);
});

client.login(token);