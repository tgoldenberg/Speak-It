var IncomingCallHolder = React.createClass({
  declineCall: function(id) {
    this.props.declineCall(id);
  },
  callTimeout: function(invitation) {
    this.props.callTimeout(invitation);
  },
  render: function() {
    var incomingCalls = this.props.incomingCalls;
    var content;
    var callList;
    if (this.props.incomingCalls.length > 0) {
      callList = incomingCalls.map(function(call, idx) {
        return <IncomingCall invitation={call} key={idx} callTimeout={this.callTimeout} declineCall={this.declineCall} />
      }.bind(this));
        content = <ul id="notification-list" style={{display: 'none'}}>
          {callList}
        </ul>;
    } else {
      content = <ul id="notification-list" className="no-messages" style={{display: 'none'}}><li>No active calls</li></ul>;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});
