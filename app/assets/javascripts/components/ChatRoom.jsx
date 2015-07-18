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
    })
    .fail(function(err) {
      console.log(err);
    });
    this.setState({turn: turn});
  },
  render: function() {
    var content = "";
    switch(this.state.turn) {
      case 0:
        content = <InfoPanel chat={this.props.first_chat}/>;
        break;
      case 1:
        content = <VideoChat chat={this.props.first_chat}/>;
        break;
      case 2:
        content = <InfoPanel chat={this.props.second_chat}/>;
        break;
      case 3:
        content = <VideoChat chat={this.props.second_chat}/>;
        break;
      case 4:
        content = <FinalInstructions chatRoom={this.props.chat_room}/>;
        break;
      default:
        content = <GameStats chatRoom={this.props.chat_room}/>;
        break;
    }
    return (
      <div className="container">
        {content}
        <button onClick={this.changeTurn} className="btn btn-primary btn-lg">
          Change Turn
        </button>
      </div>
    );
  }
});
