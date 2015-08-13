var AvatarGrabber = React.createClass({
  getInitialState: function() {
    return {text: "", url: "https://i1.wp.com/design.atlassian.com/1.4/images/avatars/default-user/192/user-avatar-blue-96%402x.png?ssl=1"};
  },
  handleChange: function(e) {
    this.setState({text: e.target.value});
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(e.target.value)) {
      this.validateURL(e.target.value);
    }
  },
  validateURL: function(value) {
    var url = get_gravatar(value);
    this.setState({url: url, text: value});
    this.setURL(url)
  },
  setURL: function(url) {
    $('#hidden-avatar-field').val(url);
  },
  render: function() {
    return (
      <div className="container">
        <i className="glyphicon glyphicon-user hidden-sm hidden-xs hidden-md" id="gravatar-icon"></i>
        <input
          onChange={this.handleChange}
          value={this.state.text}
          type="text"
          placeholder={this.props.text}
          id="select-box"
          className="form-control col-xs-6"/>
        <img
          src={this.state.url}
          className="image-box col-xs-6"
          id="avatar-image">
        </img>
      </div>
    );
  }
});
