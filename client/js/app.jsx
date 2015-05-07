var React = require('react');
var Header = require('./components/Header');
var Main = require('./components/Main');
var Footer = require('./components/Footer');

var App = React.createClass({
	render: function () {
		return (
			<div>
			    <Main />
			</div>
		);
	}
});

React.render(<App />, document.body);
