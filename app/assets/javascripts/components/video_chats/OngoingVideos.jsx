var OngoingVideos = React.createClass({
  handleChange: function() {
    this.props.changeTurn();
  },
  render: function() {
    return (
      <div id="smallVideos">
        <div className="videos container-fluid">
          <div className="local-video col-lg-2 col-sm-4 hidden-xs">
            <video
              id="localVideo"
              autoPlay={true}
              muted={"muted"}>
            </video>

            <div className="video-info-wrapper">
              <p id="local-video-username">
                {this.props.currentUser.user.username.toUpperCase()}
              </p>
              <span>
                <img
                  className="avatar-image-small"
                  src={this.props.currentUser.country_image}
                  alt=""
                  />
              </span>
            </div>
          </div>
          <div className="remote-video col-lg-2 col-sm-4 col-xs-6">
            <video id="remoteVideoSmall"
              autoPlay={true}
              muted={false}>
            </video>

            <div className="video-info-wrapper">
              <p id="remote-video-username">
                {this.props.otherUser.user.username.toUpperCase()}
              </p>
              <span>
                <img
                  className="avatar-image-small"
                  src={this.props.otherUser.country_image}
                  alt=""
                  />
              </span>
            </div>
          </div>
          <div className="button-holder col-sm-8">
            <Timer
              chatRoom={this.props.chatRoom}
              currentUser={this.props.currentUser}
              otherUser={this.props.otherUser}
              turn={this.props.turn}
              pusher={this.props.pusher}
              helperText={this.props.helperText}
              handleChange={this.handleChange}/>
          </div>
        </div>
      </div>
    );
  }
});
