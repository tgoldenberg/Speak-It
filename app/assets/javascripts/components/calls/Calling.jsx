var Calling = React.createClass({
  getInitialState: function() {
    return {timer: 0};
  },
  stopTimer: function() {
    clearInterval(this.interval);
    this.setState({timer: 0});
    $('.calling-component').toggleClass('hidden');
  },
  componentDidMount: function() {
    $('.new_invitation').on('submit', function(e) {
      this.interval = setInterval(this.tick, 1000);
    }.bind(this));
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
          <span onClick={this.stopTimer} className="glyphicon glyphicon-earphone"></span>
          <span className="call-timer">{this.state.timer}</span>
        </div>
      </div>
    );
  }
});
