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
        changeTurn={this.changeTurn} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
});