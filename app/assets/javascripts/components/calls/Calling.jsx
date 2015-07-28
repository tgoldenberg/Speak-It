var Calling = React.createClass({
  getInitialState: function() {
    return {timer: 0};
  },
  handleClick: function() {
    clearInterval(this.interval);
    this.setState({timer: 0});
    this.props.hangUp();
    var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                      this.props.helperText.cancelled_call + '</div></div>';
    $('.navbar').after(partial);
    removeFlash();
  },
  handleTimeout: function() {
    clearInterval(this.interval);
    this.setState({timer: 0});
    this.props.hangUp();
    var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                      this.props.helperText.timed_out_message + '</div></div>';
    $('.navbar').after(partial);
    removeFlash();
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
        <p className="calling-info">{this.props.helperText.calling} {this.props.user.username}...</p>
        <img src={this.props.user.avatar_url} className="call-avatar pulse"/>
        <div className="call-timer-phone">
          <span onClick={this.handleClick} className="glyphicon glyphicon-earphone"></span>
          <span className="call-timer">0:0{this.state.timer}</span>
        </div>
      </div>
    );
  }
});
