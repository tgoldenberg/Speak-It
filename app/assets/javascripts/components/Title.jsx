var Title = React.createClass({
  render: function() {
    return (
      <div>
      <div className="titleBar row">
        <div className="avatar-wrapper">
          <div className="avatar-image">
            <span>
              <img className="avatar-image" src={this.props.chat.native_speaker.avatar_url}/>
            </span>
          </div>
          <div className="avatar-info">
            <span id="title_native">{this.props.chat.text.native_speaker}</span>
          </div>
        </div>
        <div className="avatar-wrapper">
          <div className="avatar-image">
            <span>
              <img className="avatar-image" src={this.props.chat.student.avatar_url} alt="student"/>
            </span>
          </div>
          <div className="avatar-info">
            <span id="title_student">{this.props.chat.text.student}</span>
          </div>
        </div>

        <div className="topic-wrapper col-md-6">
          <h2 id="title_topic">{this.props.chat.text.topic}</h2>
        </div>

        <div className="language-wrapper col-md-2">
          <span id="title_language">{this.props.chat.text.language}</span>
          <img className="avatar-image" src={this.props.chat.language.img_url}/>
        </div>

        <div className="level-wrapper col-md-2">
          <span id="title_level">{this.props.chat.text.level}</span>
        </div>
      </div>
      <LargeVideo/>
      </div>
    );
  }
});
