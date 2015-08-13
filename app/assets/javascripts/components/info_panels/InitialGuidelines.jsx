var InitialGuidelines = React.createClass({
  render: function() {
    return (
      <div className="container">
        <br/>
        <div className="well col-md-5">
          <h1>{this.props.text.title}
            <span>
              <img
                className="message-box-logo hidden-xs"
                id="initial_guidelines_logo"
                src="https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/logo.png"
                />
            </span>
          </h1>
        </div>
        <div className="guidelines col-md-7">
          <h4>{this.props.text.description}</h4>
        </div>
      </div>
    );
  }
});
