var Invitation = React.createClass({
  getInitialState: function() {
    return {showCall: false};
  },
  callTimeout: function() {
    this.setState({showCall: false});
  },
  toggleCall: function() {
    this.setState({showCall: !this.state.showCall});
    if (!this.state.showCall) {
      this.sendInvitation();
    } else {
      this.declineCall();
    }
  },
  declineCall: function() {
    var partial = createPartial(this.props.helper_text.cancelled_call);
    $('.navbar').after(partial);
    removeFlash();
  },
  sendInvitation: function() {
    var senderId = this.props.currentUser.id;
    var recipientId = this.props.user.id;
    var data = {invitation: {sender_id: senderId, recipient_id: recipientId }};
    $.ajax({
      url: "/invitations",
      method: "post",
      data: data
    });
  },
  render: function() {
    var calling =  <Calling
                      user={this.props.user}
                      helperText={this.props.helper_text}
                      hangUp={this.callTimeout}
                    />;
    var content = this.state.showCall ? calling : "";
    return (
      <div>
        <div className="call-wrapper">
          <button onClick={this.toggleCall} className="btn btn-primary" id="init-chat-button">
            <b>{this.props.button}</b>{content}
          </button>
        </div>
      </div>
    );
  }
});
