var Calling = React.createClass({
  getInitialState: function() {
    return {timer: 0};
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  tick: function() {
    this.setState({timer: this.state.timer + 1});
  },
  render: function() {
    return (
      <div className="call-box">
        <p className="calling-info">Calling {this.props.username}...</p>
        <img src={this.props.avatar_url} className="call-avatar"/>
        <div className="call-timer-phone">
          <span className="glyphicon glyphicon-earphone"></span>
          <span className="call-timer">{this.state.timer}</span>
        </div>
      </div>
    );
  }
});
