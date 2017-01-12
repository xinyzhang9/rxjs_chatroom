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

// observable to monitor source connection
var sourceConnect = Rx.Observable.create(function(observer){
	io.on('connection', function(socket){
		// when socket connected, emit an action
		socket.emit('mySocketId',{
			'socketId':socket.id,
			'connectTime':Date.now()
		});
		// when client connected, observer will receive data
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

});

var sourceDisconnect = Rx.Observable.create(function(observable){
	io.on('connection',function(socket){
		observable.onNext({
			'socketId':socket.id,
			'event': 'clientDisconnect'
		});
	});
	return function(){
		io.close();
	}
});

// subscribe
var observerConnect = sourceConnect
	.subscribe(function(obj){
		var socketId = obj.data.socketId;
		usersMap = usersMap.set(socketId, obj.data);
		// emit an action to all users
		io.emit('allUsers', usersMap.toArray());
	});

var observerDisconnect = sourceDisconnect
	.subscribe(function(obj){
		var socketId = obj.socketId;
		var user = usersMap.get(socketId);
		usersMap = usersMap.delete(obj.socketId);
		// emit an action to all users
		io.emit('allUsers', usersMap.toArray());
	})

app.post('/message', function(req,res){
	// emit an action to display messages
	io.emit('message',req.body);
});
