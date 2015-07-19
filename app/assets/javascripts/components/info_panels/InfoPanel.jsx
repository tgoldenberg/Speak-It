var InfoPanel = React.createClass({
  render: function() {
    var guidelines = <div></div>;
    if (this.props.first == true) {
      guidelines = <InitialGuidelines/>;
    } else {
      guidelines = <SecondChatGuidelines />;
    }
    return (
      <div className="infoPanel">
        <Title chat={this.props.chat} /><br/>
        {guidelines}
      </div>
    );
  }
});
