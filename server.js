const path = require('path');
const http = require('http');

const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');





//..

const express = require('express');
const app = express();
const server = http.createServer(app);
const port = 3000;
const io = socketio(server);


server.listen(port, () =>
	console.log(
		`Chat website is functioning at ::${port}`
	)
);

//..


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Delta'; //you can change this name

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to the chat! Delta at your service!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      )
	  client.guilds.cache.get("YOUR GUILD ID")
	  client.channels.cache.get("YOUR CHANNEL ID").send(`${user.username} logged in the chat.`);

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `**${user.username}** has left the chat`)
      )

client.guilds.cache.get("YOUR GUILD ID")
	  client.channels.cache.get("YOUR GUILD ID").send(` **${user.username}** logged off from the chat.`);
		
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});



//=========   DISCORD BOT ============//
          //    begin      //
// discord.js import
const { Client, Collection } = require('discord.js');
const client = new Client({
  disableMentions: 'everyone',
})
const { readdirSync } = require('fs');
const { join } = require('path');
const Discord = require('discord.js');
// node-fetch for making HTTP requests


// activity
client.on("ready", () => {
  client.user.setActivity(`Meme Eternity`, { type: "WATCHING" }, { url: "https://youtube.com/channel/UCGAVv03OEpR8oY4_DwQewpw"});
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

//______Write the rest of your Discord bot code______



//==

/////////////// E V A L \\\\\\\\\\\\\\

client.on("message", message => {
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith("D.eval")) {
    if(message.author.id !== "YOUR ID") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
const { MessageEmbed } = require('discord.js');
      const evalEmbed = new MessageEmbed()
                .setColor(000000)
                .addField('Input:', ` \`\`\`xl\n${args}\n\`\`\``)
		.addField('Output:', ` \`\`\`xl\n${evaled}\n\`\`\``)
            message.channel.send(evalEmbed)
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
    }
  }
});
/////////////// E V A L \\\\\\\\\\\\\\

//==



{}client.login(process.env.DISCORD_TOKEN);
           //     end      //
//========= DISCORD BOT ============//

//contact: Tac Shadow#5920
//server:  https://dsc.gg/tacticalshadow
//DM me if you are facing any bugs, or want a feature request. I'll even respond to a good morning :]