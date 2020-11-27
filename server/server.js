const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.set('port', PORT);

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
	cors: {
		origins: '*:*',
		methods: ['GET', 'POST']
	}
});

// const io = require('socket.io')(8080);

io.on('connection', socket => {
	const id = socket.handshake.query.id;
	socket.join(id);
	socket.on('send-message', ({ recipients, text }) => {
		recipients.forEach(recipient => {
			const newRecipients = recipients.filter(r => r !== recipient);
			newRecipients.push(id);
			console.log(recipients);

			socket.broadcast.to(recipient).emit('receive-message', {
				recipients: newRecipients,
				text,
				sender: id
			});
		});
	});
});

httpServer.listen(PORT);
