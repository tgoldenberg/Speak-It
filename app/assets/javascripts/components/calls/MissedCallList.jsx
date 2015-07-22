var MissedCallList = React.createClass({
  render: function() {
    var content = <p>No notifications</p>;

    if (this.props.missedCalls.length > 0) {
      content = this.props.missedCalls.map(function(missedCall) {
        return <p>Missed call from {missedCall.sender.username.toUpperCase()} <br/><span className="notification-date" >at {new Date(missedCall.call.created_at).toLocaleString()}</span></p>
      });
    }

    return (
      <div>
        <ul id="missed-call-list" className="hidden">
          <div className="call-box">
          {content}
          </div>
        </ul>
      </div>
    );
  }
});
