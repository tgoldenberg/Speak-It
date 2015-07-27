var InfoPanel = React.createClass({
  render: function() {
    var guidelines = <div></div>;
    if (this.props.first == true) {
      guidelines = <InitialGuidelines text={this.props.text}/>;
    } else {
      guidelines = <SecondChatGuidelines text={this.props.text} />;
    }
    return (
      <div>{guidelines}</div>
    );
  }
});
