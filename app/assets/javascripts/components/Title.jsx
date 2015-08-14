var Title = React.createClass({
  render: function() {
    var native = this.props.chat.text.native_speaker.split(": ")[0];
    var nativeName = this.props.chat.text.native_speaker.split(": ")[1];
    var student = this.props.chat.text.student.split(": ")[0];
    var studentName = this.props.chat.text.student.split(": ")[1];
    var language = this.props.chat.text.language.split(":")[0];
    var languageName = this.props.chat.text.language.split(":")[1];
    var topic = this.props.chat.text.topic.split(": ")[0];
    var topicName = this.props.chat.text.topic.split(": ")[1];
    return (
      <div>
      <div className="titleBar row">
        <div className="avatar-wrapper hidden-xs">
          <div className="avatar-image">
            <span>
              <img className="avatar-image" src={this.props.chat.native_speaker.avatar_url}/>
            </span>
          </div>
          <div className="avatar-info">
            <span id="title_native"><b>{native}:</b><br/>{nativeName}</span>
          </div>
        </div>
        <div className="avatar-wrapper hidden-xs">
          <div className="avatar-image">
            <span>
              <img className="avatar-image" src={this.props.chat.student.avatar_url} alt="student"/>
            </span>
          </div>
          <div className="avatar-info">
            <span id="title_student"><b>{student}:</b><br/>{studentName}</span>
          </div>
        </div>

        <div className="topic-wrapper col-sm-6">
          <h2 id="title_topic"><b>{topic}:</b> {topicName}</h2>
        </div>

        <div className="language-wrapper col-sm-2">
          <span id="title_language"><b>{language}:</b><br/>{languageName}</span>
          <img className="avatar-image hidden-sm hidden-xs" src={this.props.chat.language.img_url}/>
        </div>

        <div className="level-wrapper col-md-2 hidden-sm hidden-xs">
          <span id="title_level">{this.props.chat.text.level}</span>
        </div>
      </div>
      <LargeVideo/>
      </div>
    );
  }
});
