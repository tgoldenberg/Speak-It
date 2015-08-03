var Timer = React.createClass({
  getInitialState: function() {
    var seconds = 15;
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
      var seconds = 15;
      if (turn == undefined) {
        turn = 1;
      }
      if (turn == 0 || turn == 2) {
        seconds = 20;
      }
      this.props.handleChange();
      this.setState({secondsLeft: seconds, turn: turn});
      this.interval = setInterval(this.tick, 1000);
    }
    this.setState({secondsLeft: this.state.secondsLeft - 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div className="timer-wrapper">
        <p className="timer-text"> {this.props.helperText.seconds}</p>
        <div className="timer-holder">
          <span id="seconds-display">
            {this.state.secondsLeft}
          </span>
        </div>
      </div>
    );
  }
});
