var Invitation = React.createClass({
  getInitialState: function() {
    return {showCall: false};
  },
  callTimeout: function() {
    console.log("TIMEOUT");
    this.setState({showCall: false});
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
      content = <Calling user={this.props.user} hangUp={this.callTimeout}/>
    }
    return (
      <div>

      <div className="call-wrapper">
        <button onClick={this.toggleCall} className="btn btn-primary" id="init-chat-button">Chat with <b>{this.props.user.username}</b> to learn <b>{this.props.language.name}</b>{content}</button>
      </div>

      </div>
    );
  }
});
