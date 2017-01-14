
// create UI here
var AppBar = React.createClass({
	render(){
		return (
			<div className = 'navbar-fixed'>
				<nav>
					<div className = 'nav-wrapper'>
						<a href = '#' className = 'brand-logo center'>Chat Room</a>
						<ul id = 'nav-mobile' className = 'left hide-on-med-and-down'>
							<li><a href = '#'>About</a></li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
});

var PresencePane = React.createClass({
	render(){
		return(
			<div>
				<h4>Online Users</h4>
				<table className = 'striped'>
					<thead>
						<tr>
							<th data-field = 'id'>Nickname</th>
							<th data-field = 'name>'>Joined Time</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.data.map((user, index) => {
								return <tr key = {user.nickname}>
											<td>{user.nickname}</td>
											<td>{moment(user.connectTime).format('YYYY-MM-DD HH:mm:ss')}</td>
										</tr>
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
});

var ChatPane = React.createClass({
	componentDidMount(){
		var button = document.getElementById('sendBtn');
		var textField = document.getElementById('message-input');

		var clickStream = Rx.Observable.fromEvent(button, 'click').map(e => true);
		var enterKeyPressedStream = Rx.Observable.fromEvent(textField,'keyup').filter(e => e.keyCode === 13);
		var textEnteredStream = Rx.Observable.fromEvent(textField,'keyup').map(e => e.target.value);
		var sendMessageStream = Rx.Observable.merge(clickStream, enterKeyPressedStream);

		var mergedStream = textEnteredStream.takeUntil(sendMessageStream);

		var text = '';
		var onNext = t => { text = t; };
		var onError = e => {};
		var onComplete = () => {
			$.post('/message', {'message': text, 'who': this.props.data.nickname, 'timestamp': Date.now()});
			textField.value = '';
			textField.focus();
			mergedStream.subscribe(onNext, onError, onComplete);
		};

		mergedStream.subscribe(onNext, onError, onComplete);
	},
	render(){
		return(
			<div>
				<h4>Your nickname is {this.props.data.nickname}</h4>
				<ul className = 'collection'>
				{
					this.props.data.messages.map((message,index)=>{
						return(
							<li className = 'collection-item' key = {message.timestamp}>
								<span className = 'title'>{message.who}<i>{moment(parseInt(message.timestamp)).format('YYYY-mm-dd HH:mm:ss')}</i></span>
								<p>
									<strong>{message.message}</strong>
								</p>
							</li>
						)
					})
				}
				</ul>
				<div className = 'row'>
					<div className = 'input-field col s10'>
						<input id = 'message-input' type = 'text' className = 'validate' ref = 'message' />
						<label className = 'active' htmlFor = 'message-input'>press enter to send your message</label>
					</div>
					<div className = 'input-field col s2'>
						<a id = 'sendBtn' className = 'btn-floating waves-effect waves-light green'>
							<i className = 'material-icons'>send</i>
						</a>
					</div>
				</div>
			</div>
		)
	}
});

var Main = React.createClass({
	getInitialState(){
		return{
			users: [],
			messages: []
		}
	},
	componentDidMount(){
		var socket = io();
		var props = this.props;
		var users = this.state.users;
		var messages = this.state.messages;
		var self = this;

		var socketIdStream = Rx.Observable.create(observer => {
			socket.on('mySocketId', data => { observer.onNext(data); });
		});

		socketIdStream.subscribe( data => {
			socket.emit('clientConnect', {
				nickname: props.nickname,
				socketId: data.socketId,
				connectTime: data.connectTime
			});
			console.log('client connect success');
		});

		var socketAllUsersStream = Rx.Observable.create(observer => {
			socket.on('allUsers', data => { observer.onNext(data); });
		});

		socketAllUsersStream.subscribe(data => { 
			self.setState({users: data}); // don't miss{}
			console.log(self.state.users);
		});

		var socketMessagesStream = Rx.Observable.create(observer => {
			socket.on('message', data => { observer.onNext(data); });
		});

		socketMessagesStream.subscribe(data => {
			messages.push(data);
			self.setState(messages);
			console.log(self.state);
		});

	},
	render(){
		return(
			<div>
				<AppBar />
				<div className = 'row'>
					<div className = 'col s6'>
						<ChatPane data = {{nickname: this.props.nickname, messages: this.state.messages}} />
					</div>
					<div className = 'col s6'>
						<PresencePane data = {this.state.users} />
					</div>

				</div>
			</div>	
		);
	}
});//main

var createNickName = (len) => {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
	for(var i = 0; i < len; i++){
		text += possible.charAt(Math.floor(Math.random()*possible.length));
	}

	return text;
}

ReactDOM.render(<Main  nickname = {createNickName(5)} />, document.getElementById('container'));

