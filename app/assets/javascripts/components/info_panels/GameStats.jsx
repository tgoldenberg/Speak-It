var GameStats = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="guidelines col-md-10 col-md-offset-1">
          <br/>
          <button className="btn btn-lg btn-success"><a href={"/feedbacks/new?chat_room_id=" + this.props.chatRoom.chat_room.id} >Give Feedback</a></button><br/><br/>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th colSpan="3">ChatRoom Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Participants: </td>
                <td>{this.props.chatRoom.current_user.user.username.toUpperCase()}</td>
                <td>{this.props.chatRoom.other_user.user.username.toUpperCase()}</td>
              </tr>
              <tr>
                <td>First Chat: </td>
                <td>Level ({this.props.chatRoom.first_chat.level.value}) {this.props.chatRoom.first_chat.level.name}</td>
                <td>Language: {this.props.chatRoom.first_chat.language.name}</td>
              </tr>
              <tr>
                <td>First Chat Topic:</td>
                <td colSpan="2">{this.props.chatRoom.first_chat.topic.name}</td>
              </tr>
              <tr>
                <td>Second Chat: </td>
                <td>Level ({this.props.chatRoom.second_chat.level.value}) {this.props.chatRoom.second_chat.level.name}</td>
                <td>Language: {this.props.chatRoom.second_chat.language.name}</td>
              </tr>
              <tr>
                <td>Second Chat Topic:</td>
                <td colSpan="2">{this.props.chatRoom.second_chat.topic.name}</td>
              </tr>
              <tr>
                <td colSpan="3" className="header-td">First Chat Feedback</td>
              </tr>
              <tr>
                <td>Rating: </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>Comments: </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="3" className="header-td">Second Chat Feedback</td>
              </tr>
              <tr>
                <td>Rating: </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>Comments: </td>
                <td colSpan="2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
