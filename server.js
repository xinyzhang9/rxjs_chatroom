// required modules
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var Rx = require('rx');
var Immutable = require('immutable');
var app = express();
// customized vars
var usersMap = Immutable.Map({});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/',express.static(path.join(__dirname,'client')));

// start server
var server = app.listen(3000, function(){
	console.log('listen to port 3000');
});

var io = require('socket.io')(server);
var sourceConnect = Rx.Observable.create(function(observer){
	io.on('connection', function(socket){
		socket.emit('mySocketId',{
			'socketId':socket.id,
			'connectTime':Date.now()
		});
		socket.on('clientConnect',function(data){
			observer.onNext({
				'socket':socket,
				'data':data,
				'event':'clientConnect'
			});
		});
	});

	return function(){
		io.close();
	}

})
