var NotificationsHolder = React.createClass({
  getInitialState: function() {
    return {activeInvitations: this.props.active_invitations, missedCalls: this.props.missed_calls};
  },
  declineCall: function(id) {
    console.log("DECLINED", id);
    var result = [];
    var invitations = this.state.activeInvitations;
    invitations.forEach(function(invitation){
      if (invitation.invitation.id != id) {
        result.push(invitation);
      }
    });
    this.setState({activeInvitations: result});
    var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                      'Call declined</div></div>';
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
      $('.notifications').addClass('shiny');
    }.bind(this));
  },
  render: function() {
    return (
      <div id="notifications-wrapper">
        <IncomingCallHolder declineCall={this.declineCall} incomingCalls={this.state.activeInvitations} />
        <MissedCallList missedCalls={this.state.missedCalls}/>
      </div>
    );
  }
});
