var MissedCallList = React.createClass({
  render: function() {
    var content = this.props.missedCalls.map(function(missedCall) {
      return <li className="list-item">Missed call from {missedCall.sender.username.toUpperCase()} <br/><span className="notification-date" >at {new Date(missedCall.call.created_at).toLocaleString()}</span></li>
    });
    return (
      <div>
        <ul id="missed-call-list" className="hidden">
          {content}
        </ul>
      </div>
    );
  }
});
