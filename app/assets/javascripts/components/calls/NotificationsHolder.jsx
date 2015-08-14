var NotificationsHolder = React.createClass({
  getInitialState: function() {
    return {
      activeInvitations: this.props.active_invitations,
      missedCalls: this.props.missed_calls
    };
  },
  declineCall: function() {
    this.setState({activeInvitations: []});
    this.appendFlash(this.props.helper_text.declined);
    removeGradientPulse();
  },
  callTimeout: function(invitation) {
    var callObject = {call: invitation.invitation, sender: invitation.sender}
    this.setState({activeInvitations: [], missedCalls: [callObject]});
    removeGradientPulse();
    $('.missed').addClass('gradient-pulse-red');
    this.appendFlash(this.props.helper_text.time_out);
  },
  appendFlash: function(message) {
    var partial = createPartial(message);
    $('.navbar').after(partial);
    removeFlash();
  },
  componentDidMount: function() {
    var pusher = new Pusher('18cc5c3d4ea4757ca628');
    var channel = pusher.subscribe('private-conversation.' + this.props.currentUser.id);
    channel.bind('new_invitation', function(data) {
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
