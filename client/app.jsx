
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
					<thread>
						<tr>
							<th data-field = 'id'>User Name</th>
							<th data-field = 'name>'>Joined Time</th>
						</tr>
					</thread>
					<tbody>
						{
							this.props.data.map((user, index) => {
								return (<tr key = {user.nickname}>
										<td>{user.nickname}</td>
										<td>{moment(user.connectTime).format('YYYY-MM-DD HH:mm:ss')}</td>
										</tr>
										);
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

})