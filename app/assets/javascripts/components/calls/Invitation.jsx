var Invitation = React.createClass({
  getInitialState: function() {
    return {showCall: false};
  },
  hangUp: function() {
    this.toggleCall();
  },
  toggleCall: function() {
    this.setState({showCall: !this.state.showCall});

    if (!this.state.showCall) {
      console.log("create invitation");
      var senderId = this.props.currentUser.id;
      var recipientId = this.props.user.id;
      $.ajax({
        url: "/invitations",
        method: "post",
        data: {invitation: {sender_id: senderId, recipient_id: recipientId }}
      })
      .done(function(data) {
        console.log(data);
      });
    } else {
      var partial = '<div class="notice"><div class="alert alert-danger" role="alert">' +
                      '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                        'Call ended</div></div>';
      $('.navbar').after(partial);
      removeFlash();
    }
  },
  render: function() {
    var content;
    if (this.state.showCall) {
      content = <Calling user={this.props.user} hangUp={this.hangUp}/>
    }
    return (
      <div className="call-wrapper">
        <button onClick={this.toggleCall} className="btn-default btn">Chat</button>
        {content}
      </div>
    );
  }
});
