var IncomingCall = React.createClass({
  getInitialState: function() {
    return {timer: 0};
  },
  stopTimer: function() {
    clearInterval(this.interval);
    this.setState({timer: 0});
    var invitationId = this.props.invitation.invitation.id;
    this.createMissedCall(invitationId);
  },
  createMissedCall: function(id) {
    $.ajax({
      method: "put",
      url: "/invitations/miss/" + id,
      dataType: "json",
      data: {id: id}
    })
    .done(function(data) {
      this.props.callTimeout(this.props.invitation);
    }.bind(this));

    $('.call-box').toggleClass('hidden');
    var partial = createPartial(this.props.helperText.missed);
    this.appendFlash(partial);
  },
  appendFlash: function(partial) {
    $('.navbar').after(partial);
    removeFlash();
  },
  createDeclinedCall: function(options) {
    var invitationId = options.invitationId;
    var senderId = options.senderId;
    var recipientId = options.recipientId;
    var decline = this.props.declineCall;
    $.ajax({
      url: '/invitations/decline/' + invitationId,
      method: 'put',
      dataType: 'json',
      data: {id: invitationId,
             invitation:
               {
                 recipient_id: recipientId,
                 sender_id: senderId
              }
            }
    })
    .done(function(data) {
    decline(invitationId);
      $('#notification-list').toggle();
    });
  },
  declineCall: function() {
    clearInterval(this.interval);
    this.setState({timer: 0});
    var invitationId = this.props.invitation.invitation.id;
    var recipientId = this.props.invitation.invitation.recipient_id;
    var senderId = this.props.invitation.invitation.sender_id;
    this.createDeclinedCall(
                            {
                              invitationId: invitationId,
                              senderId: senderId,
                              recipientId: recipientId
                            }
                          );
  },
  acceptCall: function(e) {
    $(e.target).parent().submit();
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  tick: function() {
    this.setState({timer: this.state.timer + 1});
    if (this.state.timer >= 12) {
      this.stopTimer();
    }
  },
  render: function() {
    var callNotificationMessage = this.props.helperText.incoming;
    callNotificationMessage += " " + this.props.invitation.sender.username + "...";
    return (
      <div className="call-box">
        <p className="calling-info" id="calling_info">{callNotificationMessage}</p>
        <img src={this.props.invitation.sender.avatar_url} className="call-avatar pulse"/>
        <div className="call-timer-phone">
          <form method="post" action="/chat_rooms" id="create_chat_room">
            <input
              type="hidden"
              value={this.props.invitation.invitation.id}
              name="invitation[id]"
            />
            <span onClick={this.acceptCall} className="glyphicon glyphicon-ok-circle"></span>
          </form>
          <a href="#">
            <span
              onClick={this.declineCall}
              className="glyphicon glyphicon-earphone delete_invitation"
              data-id={this.props.invitation.id}>
            </span>
          </a>
        </div>
      </div>
    );
  }
});
