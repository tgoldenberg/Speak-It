var SmallVideos = React.createClass({
  changeTurn: function() {
    this.props.changeTurn();
  },
  setContent: function() {
    var completedContent = <div id="completed-video"></div>;
    var incompleteContent = <OngoingVideos
                            currentUser={this.props.currentUser}
                            otherUser={this.props.otherUser}
                            turn={this.props.turn}
                            chatRoom={this.props.chatRoom}
                            helperText={this.props.helperText}
                            pusher={this.props.pusher}
                            changeTurn={this.changeTurn}
                          />;
    var content = this.props.completed ? completedContent : incompleteContent;
    return content;
  },
  render: function() {
    var content = this.setContent();
    return (
      <div>
        {content}
      </div>
    );
  }
});
