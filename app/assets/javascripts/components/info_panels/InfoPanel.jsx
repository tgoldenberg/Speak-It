var InfoPanel = React.createClass({
  render: function() {
    return (
      <div className="infoPanel">
        <Title chat={this.props.chat} /><br/>
      </div>
    );
  }
});
