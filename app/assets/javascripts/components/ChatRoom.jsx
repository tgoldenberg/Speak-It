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
      otherUserChannel: ""
    }
  },
  componentDidMount: function() {
    console.log("Mounted");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    // set media options
    var mediaOptions = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }
    };
    var pusher = new Pusher('18cc5c3d4ea4757ca628');
    // set currentUser RTC and two channels
    this.setState({currentUserRTC: {
      name: this.props.current_user.user.username,
      id: guid(),
      stream: undefined },
      currentUserChannel:  pusher.subscribe('private-conversation.' + this.props.current_user.user.id),
      otherUserChannel: pusher.subscribe('private-conversation.' + this.props.other_user.user.id),
    });

    // get local media
    navigator.getUserMedia(mediaOptions, function(stream) {
      console.log(this.state);
      this.state.currentUserRTC.stream = stream;
      var video = $('#localVideo')[0];
      video.src = window.URL.createObjectURL(stream);
      this.startRTCConnection();
    }.bind(this), function() {});
  },

  startRTCConnection: function() {
    console.log("start RTC Connection");
    // set initiator based on role in chat room
    var peer = new SimplePeer({initiator: this.state.initiator, stream: this.state.currentUserRTC.stream, trickle: false});
    console.log("PEER 1", peer);

    this.state.otherUserChannel.trigger('client-initiator', {
      data: {initiator: false}
    });

    this.state.currentUserChannel.bind('client-initiator', function(data) {
      peer = new SimplePeer({initiator: true, stream: this.state.currentUserRTC.stream, trickle: false });
      console.log("NEW PEER", peer);
      peer.on('signal', function(data) {
        console.log("SIGNAL", data);
        this.state.otherUserChannel.trigger('client-signal', {
          data: data
        });
      }.bind(this));

      // handle error messaging
      peer.on('error', function (err) { console.log('error', err) })

      // once stream has successfully been communicated
      peer.on('stream', function(stream) {
        console.log("stream", stream);
        var video = $('#remoteVideoSmall')[0];
        video.src = window.URL.createObjectURL(stream);
        $('#remoteVideoLarge')[0].src = window.URL.createObjectURL(stream);
      });
    }.bind(this));

    // when peer receives an offer
    peer.on('signal', function(data) {
      console.log("SIGNAL", data);
      this.state.otherUserChannel.trigger('client-signal', {
        data: data
      });
    }.bind(this));

    // handle error messaging
    peer.on('error', function (err) { console.log('error', err) })

    // once stream has successfully been communicated
    peer.on('stream', function(stream) {
      console.log("stream", stream);
      var video = $('#remoteVideoSmall')[0];
      video.src = window.URL.createObjectURL(stream);
      $('#remoteVideoLarge')[0].src = window.URL.createObjectURL(stream);
    });

    // once stream has closed
    peer.on('close', function() {
      console.log("CLOSE");
    });

    // once peer receives signal
    this.state.currentUserChannel.bind('client-signal', function(signal) {
      console.log("SIGNAL CLIENT", signal);
      peer.signal(signal.data);
    });
  },

  changeVisibility: function(value) {
    this.setState({visible: value});
  },
  changeTurn: function() {
    var turn = this.state.turn+1;
    console.log(turn);
    var chatRoomId = this.props.chat_room.id;
    var completed = this.props.chat_room.completed;
    var creatorId = this.props.chat_room.creator_id;
    var inviteeId = this.props.chat_room.invitee_id;
    $.ajax({
      method: 'put',
      action: 'chat_rooms/' + this.props.chat_room.id,
      data: {id: chatRoomId, chat_room: {completed: completed, creator_id: creatorId, invitee_id: inviteeId, turn: turn}}
    })
    .done(function(data) {
      console.log(data);
      var turn = data.turn;
      var completed = data.completed;
      var currentChat = this.state.currentChat;
      if (data.turn == 2) {
        currentChat = this.props.second_chat;
      }
      this.setState({turn: turn, completed: completed, currentChat: currentChat })
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });
  },
  render: function() {
    var content = "";
    switch(this.state.turn) {
      case 0:
        content = <InfoPanel text={this.props.initial_guidelines} chat={this.props.first_chat} first={true} changeTurn={this.changeTurn} />;
        break;
      case 1:
        content = <VideoChat makeVisible={this.changeVisibility} chat={this.props.first_chat} changeTurn={this.changeTurn} />;
        break;
      case 2:
        content = <InfoPanel chat={this.props.second_chat} text={this.props.second_chat_guidelines} changeTurn={this.changeTurn} />;
        break;
      case 3:
        content = <VideoChat makeVisible={this.changeVisibility} chat={this.props.second_chat} changeTurn={this.changeTurn} />;
        break;
      case 4:
        content = <FinalInstructions text={this.props.final_instructions} chatRoom={this.props.chat_room} changeTurn={this.changeTurn} />;
        break;
      default:
        content = <GameStats chatRoom={this.props}/>;
        break;
    }
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
          />
      </div>
    );
  }
});
