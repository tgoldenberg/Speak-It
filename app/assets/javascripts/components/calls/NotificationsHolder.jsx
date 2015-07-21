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
  render: function() {
    return (
      <div id="notifications-wrapper">
        <IncomingCallHolder declineCall={this.declineCall} incomingCalls={this.state.activeInvitations} />
        <MissedCallList missedCalls={this.state.missedCalls}/>
      </div>
    );
  }
});
