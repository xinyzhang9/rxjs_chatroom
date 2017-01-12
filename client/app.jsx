
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