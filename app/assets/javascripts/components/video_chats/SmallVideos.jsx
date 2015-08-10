var SmallVideos = React.createClass({
  changeTurn: function() {
    this.props.changeTurn();
  },
  render: function() {
    var content = <div></div>;
    if (this.props.completed == true) {
      content = <div></div>;
    } else {
      content = <OngoingVideos
        currentUser={this.props.currentUser}
        otherUser={this.props.otherUser}
        turn={this.props.turn}
        chatRoom={this.props.chatRoom}
        helperText={this.props.helperText}
        pusher={this.props.pusher}
        changeTurn={this.changeTurn} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
});
