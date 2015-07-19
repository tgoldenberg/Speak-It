var OngoingVideos = React.createClass({
  getInitialState: function() {
    return {currentUser: {stream: undefined}, otherUser: {stream: undefined}};
  },
  handleChange: function() {
    this.props.changeTurn();
  },
  componentDidMount: function() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;



    var options = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }
    };
    // assign local media for current user
    navigator.getUserMedia(options, function(stream) {
      var video = $('#localVideo')[0];
      video.src = window.URL.createObjectURL(stream);

      this.startPeerConnection(stream);
    }.bind(this), function() {console.log("ERROR")});
  },

  startPeerConnection: function(stream) {

    var initiator = false;
    if (this.props.currentUser.user.id == this.props.chatRoom.creator_id) {
      initiator = true;
    }
    console.log(initiator);

    var peer1 = new SimplePeer({initiator: initiator, stream: stream});
    var peer2 = new SimplePeer();

    var currentUserId = this.props.currentUser.user.id;
    var otherUserId = this.props.otherUser.user.id;

    console.log("INITIALIZE PEER CONNECTION");
    this.setState({currentUser: {stream: stream}});

    peer1.on('signal')

    var pusher = new Pusher('18cc5c3d4ea4757ca628');
    var channelName = "private-conversation." + currentUserId;
    var channel = pusher.subscribe(channelName);


    // peer2.on('stream', function(stream) {
    //   console.log("PEER 2 STREAM");
    //   var video = $('#remoteVideoSmall')[0];
    //   video.src = window.URL.createObjectURL(stream);
    // });
    //
    // peer1.on('signal', function(data) {
    //   console.log("PEER 1 SIGNAL", data);
    //   peer2.signal(data);
    // });
    //
    // peer2.on('signal', function(data) {
    //   console.log("PEER 2 SIGNAL", data);
    //   peer1.signal(data);
    // });
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
            <video id="remoteVideoSmall" autoPlay={true} muted={"muted"}></video>
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
