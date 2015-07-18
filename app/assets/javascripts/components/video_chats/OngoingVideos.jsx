var OngoingVideos = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeTurn();
  },
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
          <div className="button-holder col-sm-8">
            <button onClick={this.handleClick} className="btn btn-primary btn-lg change-turn-button">
              Change Turn
            </button>
          </div>
        </div>
      </div>
    );
  }
});
