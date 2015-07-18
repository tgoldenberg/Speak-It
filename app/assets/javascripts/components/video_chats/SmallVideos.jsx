var SmallVideos = React.createClass({
  render: function() {
    var content = <div></div>;
    if (this.props.completed == true) {
      content = <div></div>;
    } else {
      content = <OngoingVideos
        currentUser={this.props.currentUser}
        otherUser={this.props.otherUser} />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
});
