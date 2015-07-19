var VideoChat = React.createClass({
  render: function() {
    return (
      <div className="infoPanel">
        <Title chat={this.props.chat} />
        <div id="remoteVideoLarge" className="col-sm-10 col-sm-offset-1"></div>
      </div>
    );
  }
});
