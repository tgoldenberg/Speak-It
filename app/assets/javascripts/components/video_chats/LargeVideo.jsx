var LargeVideo = React.createClass({
  render: function() {
    return (
      <div>
        <video
          autoPlay={true}
          muted={"muted"}
          id="remoteVideoLarge"
          className="hidden">
        </video>
      </div>
    );
  }
});
