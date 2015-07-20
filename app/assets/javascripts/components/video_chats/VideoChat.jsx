var VideoChat = React.createClass({
  componentWillMount: function() {
    $('#remoteVideoLarge').removeClass('hidden');
  },
  componentWillUnmount: function() {
    $('#remoteVideoLarge').addClass('hidden');
  },
  render: function() {
    return (
      <div></div>
    );
  }
});
