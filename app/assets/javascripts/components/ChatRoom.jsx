var ChatRoom = React.createClass({
  getInitialState: function() {
    return {
      turn: this.props.chat_room.turn,
      completed: this.props.chat_room.completed
    }
  },
  changeTurn: function() {
    var turn = this.state.turn;
    this.setState({turn: turn+1});
  },
  render: function() {
    var content = "";
    switch(this.state.turn) {
      case 0:
        content = <h1>Initial Instructions</h1>;
        break;
      case 1:
        content = <h1>First Video Chat</h1>;
        break;
      case 2:
        content = <h1>Second Instruction</h1>;
        break;
      case 3:
        content = <h1>Second Video Chat</h1>;
        break;
      case 4:
        content = <h1>Final Wrap Up</h1>;
        break;
      case 5:
        content = <h1>Game Over</h1>;
        break;
      default:
        content = <h1>Game Stats</h1>;
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
