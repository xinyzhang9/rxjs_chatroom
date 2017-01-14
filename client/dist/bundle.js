/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _AppBar = __webpack_require__(1);

	var _AppBar2 = _interopRequireDefault(_AppBar);

	var _PresencePane = __webpack_require__(2);

	var _PresencePane2 = _interopRequireDefault(_PresencePane);

	var _ChatPane = __webpack_require__(3);

	var _ChatPane2 = _interopRequireDefault(_ChatPane);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Main = React.createClass({
		displayName: 'Main',
		getInitialState: function getInitialState() {
			return {
				users: [],
				messages: []
			};
		},
		componentDidMount: function componentDidMount() {
			var socket = io();
			var props = this.props;
			var users = this.state.users;
			var messages = this.state.messages;
			var self = this;

			var socketIdStream = Rx.Observable.create(function (observer) {
				socket.on('mySocketId', function (data) {
					observer.onNext(data);
				});
			});

			socketIdStream.subscribe(function (data) {
				socket.emit('clientConnect', {
					nickname: props.nickname,
					socketId: data.socketId,
					connectTime: data.connectTime
				});
			});

			var socketAllUsersStream = Rx.Observable.create(function (observer) {
				socket.on('allUsers', function (data) {
					observer.onNext(data);
				});
			});

			socketAllUsersStream.subscribe(function (data) {
				self.setState({ users: data }); // don't miss{}
			});

			var socketMessagesStream = Rx.Observable.create(function (observer) {
				socket.on('message', function (data) {
					observer.onNext(data);
				});
			});

			socketMessagesStream.subscribe(function (data) {
				messages.push(data);
				self.setState(messages);
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(_AppBar2.default, null),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'div',
						{ className: 'col s6' },
						React.createElement(_ChatPane2.default, { data: { nickname: this.props.nickname, messages: this.state.messages } })
					),
					React.createElement(
						'div',
						{ className: 'col s6' },
						React.createElement(_PresencePane2.default, { data: this.state.users })
					)
				)
			);
		}
	});

	//utility function

	// import components
	var createNickName = function createNickName(len) {
		var num_len = len - 2;
		var text = '';
		var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var nums = '0123456789';
		for (var i = 0; i < 2; i++) {
			text += letters.charAt(Math.floor(Math.random() * letters.length));
		}
		for (var _i = 0; _i < num_len; _i++) {
			text += nums.charAt(Math.floor(Math.random() * nums.length));
		}

		return text;
	};

	ReactDOM.render(React.createElement(Main, { nickname: createNickName(5) }), document.getElementById('container'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var AppBar = React.createClass({
		displayName: 'AppBar',
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'navbar-fixed' },
				React.createElement(
					'nav',
					null,
					React.createElement(
						'div',
						{ className: 'nav-wrapper', style: { backgroundColor: 'steelblue' } },
						React.createElement(
							'a',
							{ href: '#', className: 'brand-logo center' },
							'Welcome to Rxjs Chat Room'
						),
						React.createElement(
							'ul',
							{ id: 'nav-mobile', className: 'right hide-on-med-and-down' },
							React.createElement(
								'li',
								null,
								React.createElement(
									'a',
									{ href: 'https://github.com/xinyzhang9/rxjs_chatroom', target: '_blank' },
									'Source Code'
								)
							),
							React.createElement(
								'li',
								null,
								React.createElement(
									'a',
									{ href: 'https://xinyzhang9.github.io/', target: '_blank' },
									'About Author'
								)
							)
						)
					)
				)
			);
		}
	});

	exports.default = AppBar;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var PresencePane = React.createClass({
		displayName: 'PresencePane',
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h5',
					null,
					'Online Users'
				),
				React.createElement(
					'table',
					{ className: 'striped' },
					React.createElement(
						'thead',
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'th',
								{ 'data-field': 'id' },
								'Chat ID'
							),
							React.createElement(
								'th',
								{ 'data-field': 'name>' },
								'Joined Time'
							)
						)
					),
					React.createElement(
						'tbody',
						null,
						this.props.data.map(function (user, index) {
							return React.createElement(
								'tr',
								{ key: user.nickname },
								React.createElement(
									'td',
									null,
									user.nickname
								),
								React.createElement(
									'td',
									null,
									moment(user.connectTime).format('YYYY-MM-DD HH:mm:ss')
								)
							);
						})
					)
				)
			);
		}
	});

	exports.default = PresencePane;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ChatPane = React.createClass({
		displayName: 'ChatPane',
		componentDidMount: function componentDidMount() {
			var _this = this;

			var button = document.getElementById('sendBtn');
			var textField = document.getElementById('message-input');

			var clickStream = Rx.Observable.fromEvent(button, 'click').map(function (e) {
				return true;
			});
			var enterKeyPressedStream = Rx.Observable.fromEvent(textField, 'keyup').filter(function (e) {
				return e.keyCode === 13;
			});
			var textEnteredStream = Rx.Observable.fromEvent(textField, 'keyup').map(function (e) {
				return e.target.value;
			});
			var sendMessageStream = Rx.Observable.merge(clickStream, enterKeyPressedStream);

			var mergedStream = textEnteredStream.takeUntil(sendMessageStream);

			var text = '';
			var onNext = function onNext(t) {
				text = t;
			};
			var onError = function onError(e) {};
			var onComplete = function onComplete() {
				$.post('/message', { 'message': text, 'who': _this.props.data.nickname, 'timestamp': Date.now() });
				textField.value = '';
				textField.focus();
				mergedStream.subscribe(onNext, onError, onComplete);
			};

			mergedStream.subscribe(onNext, onError, onComplete);
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h5',
					null,
					'Your Chat ID is ',
					React.createElement(
						'i',
						null,
						this.props.data.nickname
					)
				),
				React.createElement(
					'ul',
					{ className: 'collection' },
					this.props.data.messages.map(function (message, index) {
						return React.createElement(
							'li',
							{ className: 'collection-item', key: message.timestamp },
							React.createElement(
								'div',
								{ className: 'chip' },
								React.createElement('img', { src: mapImage(message.who), alt: 'Contact Person' }),
								React.createElement(
									'span',
									{ className: 'title' },
									message.who,
									' ',
									React.createElement(
										'span',
										{ style: { color: 'red' } },
										'@ '
									),
									React.createElement(
										'span',
										{ style: { color: 'green' } },
										moment(parseInt(message.timestamp)).format('YYYY-MM-DD HH:mm:ss')
									)
								)
							),
							React.createElement(
								'p',
								null,
								React.createElement(
									'strong',
									null,
									message.message
								)
							)
						);
					})
				),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						'div',
						{ className: 'input-field col s10' },
						React.createElement('input', { id: 'message-input', type: 'text', className: 'validate', ref: 'message' }),
						React.createElement(
							'label',
							{ className: 'active', htmlFor: 'message-input' },
							'press enter to send your message'
						)
					),
					React.createElement(
						'div',
						{ className: 'input-field col s2' },
						React.createElement(
							'button',
							{ className: 'btn waves-effect waves-light', type: 'submit', id: 'sendBtn' },
							'Send',
							React.createElement(
								'i',
								{ className: 'material-icons right' },
								'send'
							)
						)
					)
				)
			);
		}
	});

	var mapImage = function mapImage(x) {
		var hash = 0,
		    i = void 0,
		    chr = void 0,
		    len = void 0;
		if (x.length === 0) return hash;
		for (i = 0, len = x.length; i < len; i++) {
			chr = x.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}

		var res = hash % 40;
		return 'images/f' + res + '.jpg';
	};

	exports.default = ChatPane;

/***/ }
/******/ ]);