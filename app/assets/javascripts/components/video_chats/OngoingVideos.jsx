var OngoingVideos = React.createClass({
  handleChange: function() {
    this.props.changeTurn();
  },
  render: function() {
    return (
      <div id="smallVideos">
        <div className="videos container-fluid">
          <div className="local-video col-sm-2">
            <video id="localVideo" autoPlay={true} muted={"muted"}></video>
            <div className="video-info-wrapper">
              <p>{this.props.currentUser.user.username.toUpperCase()}</p>
              <span><img className="avatar-image-small" src={this.props.currentUser.country_image} alt=""/></span>
            </div>
          </div>
          <div className="remote-video col-sm-2">
            <video id="remoteVideoSmall" autoPlay={true} muted={false}></video>
            <div className="video-info-wrapper">
              <p>{this.props.otherUser.user.username.toUpperCase()}</p>
              <span><img className="avatar-image-small" src={this.props.otherUser.country_image} alt=""/></span>
            </div>
          </div>
          <div className="button-holder col-sm-8">
            <Timer
              chatRoom={this.props.chatRoom}
              turn={this.props.turn}
              helperText={this.props.helperText}
              handleChange={this.handleChange}/>
          </div>
        </div>
      </div>
    );
  }
});
