var OngoingVideos = React.createClass({
  render: function() {
    return (
      <div id="smallVideos">
        <div className="videos container-fluid">
          <div className="local-video col-sm-2">
            <div id="localVideo"></div>
            <div className="video-info-wrapper">
              <p>{this.props.currentUser.user.username.toUpperCase()}</p>
              <span><img className="avatar-image-small" src={this.props.currentUser.country.image_url} alt=""/></span>
            </div>
          </div>
          <div className="remote-video col-sm-2">
            <div id="remoteVideoSmall"></div>
            <div className="video-info-wrapper">
              <p>{this.props.otherUser.user.username.toUpperCase()}</p>
              <span><img className="avatar-image-small" src={this.props.otherUser.country.image_url} alt=""/></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
