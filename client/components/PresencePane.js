const PresencePane = React.createClass({
	render(){
		return(
			<div>
				<h5>Online Users</h5>
				<table className = 'striped'>
					<thead>
						<tr>
							<th data-field = 'id'>Chat ID</th>
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

export default PresencePane;