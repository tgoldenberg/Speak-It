var InitialGuidelines = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="well">
          <h1>{this.props.text.title}</h1>
        </div>
        <div className="guidelines col-md-8 col-md-offset-2">
          <h4>{this.props.text.description}</h4>
        </div>
      </div>

    );
  }
});
