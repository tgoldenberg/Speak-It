var IncomingCall = React.createClass({
  getInitialState: function() {
    return {timer: 0};
  },
  stopTimer: function() {
    clearInterval(this.interval);
    this.setState({timer: 0});
    $('.calling-component').toggleClass('hidden');
    var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                      'Missed Call</div></div>';
    $('.navbar').after(partial);
    removeFlash();
  },
  declineCall: function() {
    console.log("DECLINE");
  },
  acceptCall: function() {
    console.log("ACCEPT");
  },
  componentDidMount: function() {
    $('.new_invitation').on('submit', function(e) {
      this.interval = setInterval(this.tick, 1000);
    }.bind(this));
  },
  tick: function() {
    this.setState({timer: this.state.timer + 1});
    if (this.state.timer >= 10) {
      this.stopTimer();
    }
  },
  render: function() {
    return (
      <div className="call-box">
        <p className="calling-info">Incoming call from {this.props.username}...</p>
        <img src={this.props.avatar_url} className="call-avatar"/>
        <div className="call-timer-phone">
          <span onClick={this.acceptCall} className="glyphicon glyphicon-ok-circle"></span>
          <span onClick={this.declineCall} className="glyphicon glyphicon-earphone delete_invitation" data-id={this.props.invitation.id}></span>
        </div>
      </div>
    );
  }
});
