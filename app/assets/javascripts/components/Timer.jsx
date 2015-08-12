var Timer = React.createClass({
  getInitialState: function() {
    var seconds = "Start";
    if (this.props.turn == 1 || this.props.turn == 3) {
      seconds = 20;
    }
    return {
      secondsLeft: seconds,
      turn: this.props.turn,
      otherDone: false,
      selfDone: false,
      pusher: this.props.pusher,
      currentUserChannel: "",
      otherUserChannel: ""
    };
  },
  tick: function() {
    if (this.state.secondsLeft <= 0) {
      clearInterval(this.interval);
      var turn = this.props.turn;
      var content = "Start";
      if (turn == undefined) {
        turn = 1;
      }
      if (turn == 0 || turn == 2) {
        content = 20;
      }
      if (turn >= 3) {
        content = "Game Stats";
      }
      this.props.handleChange();
      this.setState({secondsLeft: content, turn: turn, done: false});
    } else {
      this.setState({secondsLeft: this.state.secondsLeft - 1});
    }
  },
  componentDidMount: function() {
    if (this.props.turn == 1 || this.props.turn == 3) {
      this.interval = setInterval(this.tick, 1000);
    }
    var currentUserChannel = this.state.pusher.subscribe('private-conversation.' + this.props.currentUser.user.id);
    var otherUserChannel = this.state.pusher.subscribe('private-conversation.' + this.props.otherUser.user.id);

    this.setState({currentUserChannel: currentUserChannel, otherUserChannel: otherUserChannel });
    currentUserChannel.bind('client-done', function(data) {
      if (this.state.selfDone == true) {
        this.props.handleChange();
        this.setState({secondsLeft: 20, selfDone: false, otherDone: false});
        this.interval = setInterval(this.tick, 1000);
      } else {
        this.setState({otherDone: true});
      }
    }.bind(this))
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  handleClick: function() {
    if (this.props.turn != 1 && this.props.turn != 3 && this.props.turn != 4) {
      if (this.state.otherDone == true) {
        this.props.handleChange();
        this.setState({secondsLeft: 20, selfDone: false, otherDone: false});
        this.interval = setInterval(this.tick, 1000);
        this.state.otherUserChannel.trigger('client-done', {
          data: {done: true}
        })
      } else {
        this.setState({selfDone: true});
        document.getElementById('other-player-waiting').className = '';
        this.state.otherUserChannel.trigger('client-done', {
          data: {done: true}
        });
      }
    } else if (this.props.turn == 4) {
      this.props.handleChange();
    } else {
      this.setState({secondsLeft: "Start"});
    }
  },
  render: function() {
    if (this.props.turn == 1 || this.props.turn == 3) {
      document.getElementById('other-player-waiting').className = 'hidden';
    }
    return (
      <div className="timer-wrapper">
        <p className="timer-text"> {this.props.helperText.seconds}</p>
        <div className="timer-holder">
          <p id="other-player-waiting" className="hidden">Waiting for other player...</p>
          <span id="seconds-display" onClick={this.handleClick}>
            {this.state.secondsLeft}
          </span>
        </div>
      </div>
    );
  }
});
