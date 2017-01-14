const AppBar = React.createClass({
	render(){
		return (
			<div className = 'navbar-fixed' >
				<nav>
					<div className = 'nav-wrapper' style = {{backgroundColor: 'steelblue'}}>
						<a href = '#' className = 'brand-logo center'>Welcome to Rxjs Chat Room</a>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
					        <li><a href="https://github.com/xinyzhang9/rxjs_chatroom" target = '_blank'>Source Code</a></li>
					        <li><a href="https://xinyzhang9.github.io/" target = '_blank'>About Author</a></li>
					    </ul>
					</div>
				</nav>
			</div>
		);
	}
});

export default AppBar;