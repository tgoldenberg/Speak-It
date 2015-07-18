var ChatRoom = React.createClass({
  getInitialState: function() {
    return {
      turn: this.props.chat_room.turn,
      completed: this.props.chat_room.completed
    }
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
      this.setState({turn: turn, completed: completed})
    }.bind(this))
    .fail(function(err) {
      console.log(err);
    });
  },
  render: function() {
    var content = "";
    switch(this.state.turn) {
      case 0:
        content = <InfoPanel chat={this.props.first_chat} changeTurn={this.changeTurn} />;
        break;
      case 1:
        content = <VideoChat chat={this.props.first_chat} changeTurn={this.changeTurn} />;
        break;
      case 2:
        content = <InfoPanel chat={this.props.second_chat} changeTurn={this.changeTurn} />;
        break;
      case 3:
        content = <VideoChat chat={this.props.second_chat} changeTurn={this.changeTurn} />;
        break;
      case 4:
        content = <FinalInstructions chatRoom={this.props.chat_room} changeTurn={this.changeTurn} />;
        break;
      default:
        content = <GameStats chatRoom={this.props.chat_room}/>;
        break;
    }
    return (
      <div className="container-fluid no-padding">
        {content}
        <button onClick={this.changeTurn} className="btn btn-primary btn-lg">
          Change Turn
        </button>
        <SmallVideos currentUser={this.props.current_user} otherUser={this.props.other_user} completed={this.state.completed}/>
      </div>
    );
  }
});
