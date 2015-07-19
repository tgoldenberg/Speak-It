var OngoingVideos = React.createClass({
  handleChange: function() {
    this.props.changeTurn();
  },
  componentDidMount: function() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    currentUser = {
      name: "User",
      stream: undefined
    };

    var options = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }
    };

    navigator.getUserMedia(options, function(stream) {
      currentUser.stream = stream;
      var video = $('#localVideo')[0];
      video.src = window.URL.createObjectURL(stream);

      console.log("START");
    }, function() {console.log("ERROR")});
  },
  render: function() {
    return (
      <div id="smallVideos">
        <div className="videos container-fluid">
          <div className="local-video col-sm-2">
            <video id="localVideo" autoPlay={true} muted={"muted"}></video>
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
            <Timer
              turn={this.props.turn}
              handleChange={this.handleChange}/>
          </div>
        </div>
      </div>
    );
  }
});
