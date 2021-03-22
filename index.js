const error = require('./functions/error.js');
if (process.env.ENV !== 'production') require('dotenv').config();

async function init() {
  try {
    const sql = require('./functions/sql.js');

    const fs = require('fs');
    const Discord = require('discord.js');
    const client = new Discord.Client({fetchAllMembers: true});

    fs.readdir('./events/', (err, files) => {
      if (err) return console.error(err);

      return files.forEach((file) => {
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
      });
    });

    await sql.connect(process.env.DATABASE_URL);
    client.login(process.env.TOKEN);
  } catch (err) {
    error.console(err);
  }
};

init();