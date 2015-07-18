var VideoChat = React.createClass({
  render: function() {
    return (
      <div className="infoPanel">
        <Title chat={this.props.chat} />
        <h4>Video Chat</h4>
      </div>
    );
  }
});
