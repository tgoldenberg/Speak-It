var Timer = React.createClass({
  getInitialState: function() {
    var seconds = "Start";
    if (this.props.turn == 1 || this.props.turn == 3) {
      seconds = 20;
    }
    return {
      secondsLeft: seconds,
      turn: this.props.turn
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
        seconds = 20;
      }
      if (turn >= 3) {
        content = "Game Stats";
      }
      this.props.handleChange();
      this.setState({secondsLeft: content, turn: turn});
    } else {
      this.setState({secondsLeft: this.state.secondsLeft - 1});
    }
  },
  componentDidMount: function() {
    if (this.props.turn == 1 || this.props.turn == 3) {
      this.interval = setInterval(this.tick, 1000);
    }
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  handleClick: function() {
    if (this.props.turn != 1 && this.props.turn != 3) {
      this.props.handleChange();
      this.setState({secondsLeft: 20});
      this.interval = setInterval(this.tick, 1000);
    } else {
      this.setState({secondsLeft: "Start"});
    }
  },
  render: function() {
    return (
      <div className="timer-wrapper">
        <p className="timer-text"> {this.props.helperText.seconds}</p>
        <div className="timer-holder">
          <span id="seconds-display" onClick={this.handleClick}>
            {this.state.secondsLeft}
          </span>
        </div>
      </div>
    );
  }
});
