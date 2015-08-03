var NotificationsHolder = React.createClass({
  getInitialState: function() {
    return {activeInvitations: this.props.active_invitations, missedCalls: this.props.missed_calls};
  },
  declineCall: function(id) {
    console.log("DECLINED", id);
    this.setState({activeInvitations: []});
    var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                      this.props.helper_text.declined + '</div></div>';
    $('.navbar').after(partial);
    removeGradientPulse();
    removeFlash();
  },
  callTimeout: function(invitation) {
    console.log("new missed call", invitation);
    var missedCalls = this.state.missedCalls;
    var callObject = {call: invitation.invitation, sender: invitation.sender}
    this.setState({activeInvitations: [], missedCalls: [callObject]});
    removeGradientPulse();
    var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                      this.props.helper_text.time_out + '</div></div>';
    $('.navbar').after(partial);
    removeFlash();
  },
  componentDidMount: function() {
    var pusher = new Pusher('18cc5c3d4ea4757ca628');
    var channelName = 'private-conversation.' + this.props.currentUser.id;
    var channel = pusher.subscribe(channelName);
    // var invitations = this.state.activeInvitations;
    channel.bind('new_invitation', function(data) {
      console.log("NEW INVITATION", data);
      this.setState({activeInvitations: [data.invitation]});
      $('.notifications').addClass('gradient-pulse');
    }.bind(this));
  },
  render: function() {
    return (
      <div id="notifications-wrapper">
        <IncomingCallHolder
          declineCall={this.declineCall}
          callTimeout={this.callTimeout}
          helperText={this.props.helper_text}
          incomingCalls={this.state.activeInvitations} />
        <MissedCallList
          helperText={this.props.helper_text}
          missedCalls={this.state.missedCalls}/>
      </div>
    );
  }
});
