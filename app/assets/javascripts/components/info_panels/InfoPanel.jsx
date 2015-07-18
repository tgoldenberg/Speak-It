var InfoPanel = React.createClass({
  render: function() {
    return (
      <div className="infoPanel">
        <Title chat={this.props.chat} />
        <h4>Info Panel</h4>
      </div>
    );
  }
});
