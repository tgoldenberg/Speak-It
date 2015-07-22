var IncomingCallHolder = React.createClass({
  declineCall: function(id) {
    this.props.declineCall(id);
  },
  callTimeout: function(invitation) {
    this.props.callTimeout(invitation);
  },
  render: function() {
    var incomingCalls = this.props.incomingCalls;
    var content = <li className="list-item">No incoming calls</li>
    if (this.props.incomingCalls.length > 0) {
      content = incomingCalls.map(function(call, idx) {
        return <IncomingCall invitation={call} key={idx} callTimeout={this.callTimeout} declineCall={this.declineCall} />
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
