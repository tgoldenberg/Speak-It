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
        return <IncomingCall invitation={call} key={idx} callTimeout={this.callTimeout} declineCall={this.declineCall} helperText={this.props.helperText} />
      }.bind(this));
        content = <ul id="notification-list" style={{display: 'none'}}>
          <div>{callList}</div>
        </ul>;
    } else {
      content = <ul id="notification-list" style={{display: 'none'}}><div className="call-box no-calls"><p>{this.props.helperText.no_active}</p></div></ul>;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});
