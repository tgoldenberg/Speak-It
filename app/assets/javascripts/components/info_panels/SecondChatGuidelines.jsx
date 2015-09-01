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
                  src="data:image/png;base64,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" -logo fi
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
