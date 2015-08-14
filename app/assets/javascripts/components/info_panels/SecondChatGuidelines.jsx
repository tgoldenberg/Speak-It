var SecondChatGuidelines = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="col-md-5 col-lg-4 title-holder">
          <div className="well animated bounceIn">
            <h1>{this.props.text.title}
              <span>
                <img
                  className="message-box-logo hidden-xs hidden-md hidden-lg"
                  id="initial_guidelines_logo"
                  src="https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/logo.png"
                  />
              </span>
            </h1>
          </div>
          <div className="tip-holder hidden-sm hidden-xs">
            <p>Tips: </p>
            <ul>
              <li><b>Tip 1:</b> Encourage the learner by giving positive remarks.</li>
              <li><b>Tip 2:</b> Engage the other user by asking questions.</li>
              <li><b>Tip 3:</b> Remember to speak at a slow pace.</li>
            </ul>
          </div>
        </div>
        <div className="guidelines col-md-7 col-lg-8">
          <h4>{this.props.text.description}</h4>
        </div>
      </div>
    );
  }
});
