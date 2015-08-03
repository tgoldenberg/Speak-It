var GameStats = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="guidelines col-md-10 col-md-offset-1">
          <br/>
          <button className="btn btn-lg btn-success"><a href={"/feedbacks/new?chat_room_id=" + this.props.chatRoom.chat_room.id} >{this.props.chatRoom.helper_text.feedback_button}</a></button><br/><br/>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th colSpan="3">{this.props.chatRoom.helper_text.stats_title}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_participants} </td>
                <td>{this.props.chatRoom.current_user.user.username.toUpperCase()}</td>
                <td>{this.props.chatRoom.other_user.user.username.toUpperCase()}</td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_first_chat}</td>
                <td>{this.props.chatRoom.first_chat.text.level}</td>
                <td>{this.props.chatRoom.first_chat.text.language}</td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_first_topic}</td>
                <td colSpan="2">{this.props.chatRoom.first_chat.topic.name}</td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_second_chat}</td>
                <td>{this.props.chatRoom.second_chat.text.level}</td>
                <td>{this.props.chatRoom.second_chat.text.language}</td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_second_topic}</td>
                <td colSpan="2">{this.props.chatRoom.second_chat.topic.name}</td>
              </tr>
              <tr>
                <td colSpan="3" className="header-td">{this.props.chatRoom.helper_text.stats_first_feedback}</td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_rating}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_comments}</td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td colSpan="3" className="header-td">{this.props.chatRoom.helper_text.stats_second_feedback}</td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_rating} </td>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <td>{this.props.chatRoom.helper_text.stats_comments}</td>
                <td colSpan="2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
