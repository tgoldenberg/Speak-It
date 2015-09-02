var ChatRoom = React.createClass({
  getInitialState: function() {
    var pusher = new Pusher('18cc5c3d4ea4757ca628');
    var currentUserChannel = 'private-conversation.' + this.props.current_user.user.id;
    var otherUserChannel = 'private-conversation.' + this.props.other_user.user.id;
    return {
      turn: this.props.chat_room.turn,
      completed: this.props.chat_room.completed,
      visible: false,
      currentChat: this.props.first_chat,
      initiator: false,
      currentUserRTC: {},
      currentUserChannel: pusher.subscribe(currentUserChannel),
      otherUserChannel: pusher.subscribe(otherUserChannel),
      pusher: pusher
    }
  },

  componentDidMount: function() {
    this.initiateLocalMedia();
  },

  componentWillUnmount: function() {
    var callback = function(data) {};
    this.state.currentUserChannel.unbind('client-signal', callback);
    this.state.currentUserChannel.unbind('client-initiator', callback);
    this.state.otherUserChannel.unbind('client-signal', callback);
    this.state.otherUserChannel.unbind('client-initiator', callback);
  },

  initiateLocalMedia: function() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    var mediaOptions = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }
    };
    navigator.getUserMedia(mediaOptions, function(stream) {
      var p1 = new Promise(function(resolve, reject){
        this.setCurrentUserRTCInfo(stream);
        resolve();
      }.bind(this));
      var p2 = p1.then(function(resolve, reject) {
        var video = $('#localVideo')[0];
        video.src = window.URL.createObjectURL(stream);
        // if (this.props.current_user.user.id == this.props.chat_room.creator_id) {
        this.startRTCConnection();
      }.bind(this));
    }.bind(this), function() {});
  },

  setCurrentUserRTCInfo: function(stream) {
    var pusher = this.state.pusher;
    var currentUserChannel = 'private-conversation.' + this.props.current_user.user.id;
    var otherUserChannel = 'private-conversation.' + this.props.other_user.user.id;
    this.setState(
      {
        currentUserRTC: {
          name: this.props.current_user.user.username,
          id: guid(),
          stream: stream
        }
      }
    );
  },
  peerStream: function(peer) {
    peer.on('stream', function(stream) {
      // console.log(window.myStream);
      console.log("receive stream", stream);
      var video = $('#remoteVideoSmall')[0];
      video.src = URL.createObjectURL(stream);
      $('#remoteVideoLarge')[0].src = URL.createObjectURL(stream);
    });
  },
  peerSignal: function(peer) {
    peer.on('signal', function(data) {
      console.log("Signaling", data);
      this.state.otherUserChannel.trigger('client-signal', {
        data: data
      });
    }.bind(this));
  },
  peerError: function(peer) {
    peer.on('error', function (err) { console.log('error', err) });
  },
  peerClose: function(peer) {
    peer.on('close', function() {
      console.log("CLOSE");
    });
  },

  startRTCConnection: function(initiator) {
    var customConfig;
    // Call XirSys ICE servers
    var p1 = new Promise(function(resolve, reject) {
      $.ajax({
        url: "https://service.xirsys.com/ice",
        data: {
          ident: "tgoldenberg",
          secret: "d0abb006-43d9-11e5-b113-5f60ee8ba8ea",
          domain: "speakitlanguages.com",
          application: "default",
          room: "default",
          secure: 1
        }
      })
      .done(function(data, status) {
        resolve(data, status);
      });
    });

    p1.then(function(data, status){
      customConfig = data.d;
    // PeerJS object
      var peer = new SimplePeer(
                                {
                                  initiator: this.state.initiator,
                                  stream: this.state.currentUserRTC.stream,
                                  trickle: false,
                                  config: customConfig
                                }
                              );
      this.state.otherUserChannel.trigger('client-initiator', {
        data: {initiator: false}
      });

      this.state.currentUserChannel.bind('client-initiator', function(data) {
        // console.log("receive initiator", data);
        peer = new SimplePeer(
                              {
                                initiator: true,
                                stream: this.state.currentUserRTC.stream,
                                trickle: false,
                                customConfig
                              }
                            );

        this.peerSignal(peer);
        this.peerError(peer);
        peer.on('stream', function(stream) {
          // console.log(window.myStream);
          console.log("receive stream", stream);
          var video = $('#remoteVideoSmall')[0];
          video.src = URL.createObjectURL(stream);
          $('#remoteVideoLarge')[0].src = window.URL.createObjectURL(stream);
        });
      }.bind(this));

      this.peerSignal(peer);
      this.peerError(peer);
      peer.on('stream', function(stream) {
        // console.log(window.myStream);
        console.log("receive stream", stream);
        var video = $('#remoteVideoSmall')[0];
        video.src = URL.createObjectURL(stream);
        $('#remoteVideoLarge')[0].src = window.URL.createObjectURL(stream);
      });
      this.peerClose(peer);

      this.state.currentUserChannel.bind('client-signal', function(signal) {
        console.log("Receive signal", signal);
        peer.signal(signal.data);
      });
    }.bind(this))
  },

  changeVisibility: function(value) {
    this.setState({visible: value});
  },

  changeTurn: function() {
    var turn = this.state.turn+1;
    var chatRoomId = this.props.chat_room.id;
    var completed = turn >= 5 ? true : this.props.chat_room.completed;
    var creatorId = this.props.chat_room.creator_id;
    var inviteeId = this.props.chat_room.invitee_id;
    var currentChat = turn >= 2 ? this.props.second_chat : this.props.first_chat;
    this.setState(
                  {
                    turn: turn,
                    completed: completed,
                    currentChat: currentChat
                  }
                );
    this.ajaxUpdate(
      {
        id: chatRoomId,
        chat_room: {
          completed: completed,
          creator_id: creatorId,
          invitee_id: inviteeId,
          turn: turn
        }
      }
    );
  },
  ajaxUpdate: function(data) {
    $.ajax({
      method: 'put',
      action: 'chat_rooms/' + this.props.chat_room.id,
      data: data
    });
  },
  setContent: function() {
    var content;
    switch(this.state.turn) {
      case 0:
        content = <InfoPanel
                    text={this.props.initial_guidelines}
                    chat={this.props.first_chat}
                    first={true}
                    changeTurn={this.changeTurn}
                  />;
        break;
      case 1:
        content = <VideoChat
                    makeVisible={this.changeVisibility}
                    chat={this.props.first_chat}
                    changeTurn={this.changeTurn}
                  />;
        break;
      case 2:
        content = <InfoPanel
                    chat={this.props.second_chat}
                    text={this.props.second_chat_guidelines}
                    changeTurn={this.changeTurn}
                  />;
        break;
      case 3:
        content = <VideoChat
                    makeVisible={this.changeVisibility}
                    chat={this.props.second_chat}
                    changeTurn={this.changeTurn}
                  />;
        break;
      case 4:
        content = <FinalInstructions
                    text={this.props.final_instructions}
                    chatRoom={this.props.chat_room}
                    changeTurn={this.changeTurn}
                  />;
        break;
      default:
        content = <GameStats chatRoom={this.props}/>;
        break;
    }
    return content;
  },

  render: function() {
    var content = this.setContent();
    return (
      <div className="container-fluid no-padding">
        <div className="infoPanel">
          <Title chat={this.state.currentChat} />
          {content}
        </div>

        <SmallVideos
          changeTurn={this.changeTurn}
          currentUser={this.props.current_user}
          otherUser={this.props.other_user}
          completed={this.state.completed}
          chatRoom={this.props.chat_room}
          helperText={this.props.helper_text}
          turn={this.state.turn}
          pusher={this.state.pusher}
          currentUserChannel={this.state.currentUserChannel}
          otherUserChannel={this.state.otherUserChannel}
          />
      </div>
    );
  }
});
