var IncomingCallHolder = React.createClass({
  declineCall: function(id) {
    this.props.declineCall(id);
  },
  callTimeout: function(invitation) {
    this.props.callTimeout(invitation);
  },
  buildNotification: function(content) {
    return <ul id="notification-list" style={{display: 'none'}}>{content}</ul>;
  },
  render: function() {
    var callList = this.props.incomingCalls.map(function(call, idx) {
      return <IncomingCall
                invitation={call}
                key={idx}
                callTimeout={this.callTimeout}
                declineCall={this.declineCall}
                helperText={this.props.helperText} />;
    }.bind(this));

    var activeCalls = this.buildNotification(<div>{callList}</div>);

    var noCalls = this.buildNotification(
      <div className="call-box no-calls">
        <p id="no_calls">{this.props.helperText.no_active}</p>
      </div>
    );
    var content = this.props.incomingCalls.length > 0 ? activeCalls : noCalls;

    return (
      <div>
        {content}
      </div>
    );
  }
});
