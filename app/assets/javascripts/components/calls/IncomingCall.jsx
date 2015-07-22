var IncomingCall = React.createClass({
  getInitialState: function() {
    return {timer: 0};
  },
  stopTimer: function() {

    var invitationId = this.props.invitation.invitation.id;
    $.ajax({
      method: "put",
      url: "/invitations/miss/" + invitationId,
      dataType: "json",
      data: {id: invitationId}
    })
    .done(function(data) {
      console.log("TIMED OUT");
      this.props.callTimeout(this.props.invitation);
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });

    $('.call-box').toggleClass('hidden');
    var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                    '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                      'Missed Call</div></div>';
    $('.navbar').after(partial);
    removeFlash();
  },
  declineCall: function() {
    var invitationId = this.props.invitation.invitation.id;
    var recipientId = this.props.invitation.invitation.recipient_id;
    var senderId = this.props.invitation.invitation.sender_id;
    $.ajax({
      url: '/invitations/decline/' + invitationId,
      method: 'put',
      dataType: 'json',
      data: {id: invitationId, invitation: {recipient_id: recipientId, sender_id: senderId }}
    })
    .done(function(data) {
      console.log("RECIPIENT DECLINES CALL", data);
      this.props.declineCall(invitationId);
      $('#notification-list').toggle();
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });
  },
  acceptCall: function(e) {
    console.log("ACCEPT");
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
    if (this.state.timer >= 5) {
      this.stopTimer();
    }
  },
  render: function() {
    return (
      <div className="call-box">
        <p className="calling-info">Incoming call from {this.props.invitation.sender.username}...</p>
        <img src={this.props.invitation.sender.avatar_url} className="call-avatar"/>
        <div className="call-timer-phone">
          <form method="post" action="/chat_rooms" id="create_chat_room">
            <input type="hidden" value={this.props.invitation.invitation.id} name="invitation[id]"/>
              <span onClick={this.acceptCall} className="glyphicon glyphicon-ok-circle"></span>
          </form>
          <a href="#"><span onClick={this.declineCall} className="glyphicon glyphicon-earphone delete_invitation" data-id={this.props.invitation.id}></span></a>
        </div>
      </div>
    );
  }
});


// function for listening to a button click in order to delete an invitation
// var deleteInvitation = function() {
//   $('.delete_invitation').on('click', function(e) {
//     var target = $(e.target);
//     e.preventDefault();
//     var invitationId = parseInt($(this).data('id'));
//     // call to the invitations#destroy action
    // $.ajax({
    //   url: '/invitations',
    //   method: 'delete',
    //   dataType: 'json',
    //   data: {invitation: {id: invitationId}}
    // })
    // .done(function(data) {
    //   // hide the <li> tag with the buttons
    //   target.parent().hide();
    //   $('#notification-list').toggle();
    // })
    // .fail(function(err) {
    //   console.log(err);
    // });
//   });
// };
