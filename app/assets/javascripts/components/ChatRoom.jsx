var ChatRoom = React.createClass({
  getInitialState: function() {
    return {
      turn: this.props.chat_room.turn,
      completed: this.props.chat_room.completed,
      visible: false,
      currentChat: this.props.first_chat,
      initiator: false,
      currentUserRTC: {},
      currentUserChannel: "",
      otherUserChannel: "",
      pusher: new Pusher('18cc5c3d4ea4757ca628')
    }
  },

  componentDidMount: function() {
    this.initiateLocalMedia();
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
      this.setCurrentUserRTCInfo(stream);
      var video = $('#localVideo')[0];
      video.src = window.URL.createObjectURL(stream);
      setTimeout(this.startRTCConnection, 100);
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
        },
        currentUserChannel: pusher.subscribe(currentUserChannel),
        otherUserChannel: pusher.subscribe(otherUserChannel)
      }
    );
  },
  peerStream: function(peer) {
    peer.on('stream', function(stream) {
      var video = $('#remoteVideoSmall')[0];
      video.src = window.URL.createObjectURL(stream);
      $('#remoteVideoLarge')[0].src = window.URL.createObjectURL(stream);
    });
  },
  peerSignal: function(peer) {
    peer.on('signal', function(data) {
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
    var peer = new SimplePeer(
                              {
                                initiator: this.state.initiator,
                                stream: this.state.currentUserRTC.stream,
                                trickle: false
                              }
                            );

    this.state.otherUserChannel.trigger('client-initiator', {
      data: {initiator: false}
    });

    this.state.currentUserChannel.bind('client-initiator', function(data) {
      peer = new SimplePeer(
                            {
                              initiator: true,
                              stream: this.state.currentUserRTC.stream,
                              trickle: false
                            }
                          );

      this.peerSignal(peer);
      this.peerError(peer);
      this.peerStream(peer);
    }.bind(this));

    this.peerSignal(peer);
    this.peerError(peer);
    this.peerStream(peer);
    this.peerClose(peer);

    this.state.currentUserChannel.bind('client-signal', function(signal) {
      peer.signal(signal.data);
    });
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
          />
      </div>
    );
  }
});
