
// import components
import AppBar from './components/AppBar';
import PresencePane from './components/PresencePane';
import ChatPane from './components/ChatPane';

const Main = React.createClass({
	getInitialState(){
		return{
			users: [],
			messages: []
		}
	},
	componentDidMount(){
		let socket = io();
		let props = this.props;
		let users = this.state.users;
		let messages = this.state.messages;
		let self = this;

		let socketIdStream = Rx.Observable.create(observer => {
			socket.on('mySocketId', data => { observer.onNext(data); });
		});

		socketIdStream.subscribe( data => {
			socket.emit('clientConnect', {
				nickname: props.nickname,
				socketId: data.socketId,
				connectTime: data.connectTime
			});
		});

		let socketAllUsersStream = Rx.Observable.create(observer => {
			socket.on('allUsers', data => { observer.onNext(data); });
		});

		socketAllUsersStream.subscribe(data => { 
			self.setState({users: data}); // don't miss{}
		});

		let socketMessagesStream = Rx.Observable.create(observer => {
			socket.on('message', data => { observer.onNext(data); });
		});

		socketMessagesStream.subscribe(data => {
			messages.push(data);
			self.setState(messages);
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
});

//utility function
let createNickName = (len) => {
	const num_len = len-2;
	let text = '';
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const nums = '0123456789';
	for(let i = 0; i < 2; i++){
		text += letters.charAt(Math.floor(Math.random()*letters.length));
	}
	for(let i = 0; i < num_len; i++){
		text += nums.charAt(Math.floor(Math.random()*nums.length));
	}

	return text;
}

ReactDOM.render(<Main nickname = {createNickName(5)} />, document.getElementById('container'));

