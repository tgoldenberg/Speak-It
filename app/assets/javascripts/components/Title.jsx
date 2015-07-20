var Title = React.createClass({
  render: function() {
    return (
      <div>
      <div className="titleBar row">
        <div className="avatar-wrapper">
          <div className="avatar-image">
            <span><img className="avatar-image" src={this.props.chat.native_speaker.avatar_url}/></span>
          </div>
          <div className="avatar-info">
            <span>Native Speaker: <br/>{this.props.chat.native_speaker.username.toUpperCase()}</span>
          </div>
        </div>
        <div className="avatar-wrapper">
          <div className="avatar-image">
            <span><img className="avatar-image" src={this.props.chat.student.avatar_url} alt="student"/></span>
          </div>
          <div className="avatar-info">
            <span>Student: <br/>{this.props.chat.student.username.toUpperCase()}</span>
          </div>
        </div>

        <div className="topic-wrapper col-md-6">
          <h2><b>Topic:</b> {this.props.chat.topic.name}</h2>
        </div>

        <div className="language-wrapper col-md-2">
          <span>Language: {this.props.chat.language.name}</span>
          <img className="avatar-image" src={this.props.chat.language.img_url}/>
        </div>

        <div className="level-wrapper col-md-2">
          <span>Level: ({this.props.chat.level.value}) {this.props.chat.level.name}</span>
        </div>

      </div>
      <LargeVideo/>
      </div>
    );
  }
});
