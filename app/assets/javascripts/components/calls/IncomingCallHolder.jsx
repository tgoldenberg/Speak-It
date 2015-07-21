var IncomingCallHolder = React.createClass({
  declineCall: function(id) {
    this.props.declineCall(id);
  },
  render: function() {
    var incomingCalls = this.props.incomingCalls;
    var content;
    if (this.props.incomingCalls.length > 0) {
      content = incomingCalls.map(function(call, idx) {
        return <IncomingCall invitation={call} key={idx} declineCall={this.declineCall} />
      }.bind(this));
    }
    return (
      <div>
        <ul id="notification-list" style={{display: 'none'}}>
          {content}
        </ul>
      </div>
    );
  }
});
