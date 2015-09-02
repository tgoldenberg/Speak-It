var SmallVideos = React.createClass({
  getInitialState: function() {
    return {transparency: ""};
  },
  changeTurn: function() {
    console.log("Turn", this.props.turn);
    console.log("transparency", $('#smallVideos').css("background-color"));
    if (this.props.turn == 0 || this.props.turn == 2) {
      this.setState({transparency: "transparent"});
      // $('#smallVideos').css({
      //    "background-color": "rgba(247,247,247,0.3)"
      // });
    } else {
      // $('#smallVideos').css({
      //   "background-color": "rgba(247,247,247,1)"
      // });
      this.setState({transparency: ""});
    }
    this.props.changeTurn();
  },
  setContent: function() {
    var completedContent = <div id="completed-video"></div>;
    var incompleteContent = <OngoingVideos
                            transparency={this.state.transparency}
                            currentUser={this.props.currentUser}
                            otherUser={this.props.otherUser}
                            turn={this.props.turn}
                            chatRoom={this.props.chatRoom}
                            helperText={this.props.helperText}
                            pusher={this.props.pusher}
                            currentUserChannel={this.props.currentUserChannel}
                            otherUserChannel={this.props.otherUserChannel}
                            changeTurn={this.changeTurn}
                          />;
    var content = this.props.completed ? completedContent : incompleteContent;
    return content;
  },
  render: function() {
    var content = this.setContent();
    return (
      <div id="bottom-panel-container">
        {content}
      </div>
    );
  }
});
