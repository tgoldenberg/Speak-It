var Calling = React.createClass({
  getInitialState: function() {
    return {timer: 0};
  },
  handleClick: function() {
    this.endCall(this.props.helperText.cancelled_call);
  },
  handleTimeout: function() {
    this.endCall(this.props.helperText.timed_out_message);
  },
  endCall: function(message) {
    clearInterval(this.interval);
    this.setState({timer: 0});
    this.props.hangUp();
    var partial = createPartial(message);
    this.appendFlash(partial);
    removeFlash();
  },
  appendFlash: function(partial) {
    $('.navbar').after(partial);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  tick: function() {
    this.setState({timer: this.state.timer + 1});
    if (this.state.timer >= 10) {
      this.handleTimeout();
    }
  },
  render: function() {
    return (
      <div className="call-box">
        <p className="calling-info">
          {this.props.helperText.calling} {this.props.user.username}...
        </p>
        <img src={this.props.user.avatar_url} className="call-avatar pulse"/>
        <div className="call-timer-phone">
          <span
            onClick={this.handleClick}
            className="glyphicon glyphicon-earphone">
          </span>
          <span className="call-timer">
            0:0{this.state.timer}
          </span>
        </div>
      </div>
    );
  }
});
