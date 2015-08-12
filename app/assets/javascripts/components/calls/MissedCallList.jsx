var MissedCallList = React.createClass({
  render: function() {
    var content = <p id="no_missed">{this.props.helperText.no_missed}</p>;

    if (this.props.missedCalls.length > 0) {
      content = this.props.missedCalls.map(function(missedCall, idx) {
        var callDate = new Date(missedCall.call.created_at).toLocaleString()
          .split(":")
          .splice(0,2)
          .join(":")
          .split(" ");
        callDate[0] += ",";
        callDate = callDate.join(" ");

        var text = "Missed call from " + missedCall.sender.username.toUpperCase() + " \n";
        text += "at " + callDate;
        return <p key={idx} id="missed_call">{text}</p>;
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
