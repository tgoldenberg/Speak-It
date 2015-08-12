// The React Helper sets up the Test DOM and handles dependencies
// react_helper_path and __component_base are globals set in the test runner,
// so you don't need to worry about relative paths
var ReactHelper = require(react_helper_path);
var Timer = require(__component_base + '/Timer').component;

describe('Timer', function(done){
  var variables = require('./fixtures/props');
  var props = variables.props;

  var value = 0;
  beforeEach(function(done) {
    subject = jasmineReact.render(<Timer turn={value} chatRoom={props.chat_room} handleChange={props.handleChange} currentUser={props.current_user} pusher={new variables.pusher} otherUser={props.other_user} helperText={props.helper_text}/>);
    done();
  });

  describe('.initialState', function(done) {
    it('sets turn to 0', function(done) {
      expect(subject.state.turn).toEqual(value);
      done();
    });

    it('sets text to Start', function(done) {
      expect(document.getElementById('seconds-display').innerHTML).toEqual("Start");
      done();
    });

    it('Starts Timer when turn is 1', function(done) {
      subject.setState({otherDone: true});
      subject.handleClick();
      expect(subject.state.secondsLeft).toEqual(20);
      done();
    });

    it('starts the second chat instructions when the timer runs out', function(done) {
      subject = jasmineReact.render(<Timer turn={1} chatRoom={props.chat_room} handleChange={props.handleChange} currentUser={props.current_user} pusher={new variables.pusher} otherUser={props.other_user} helperText={props.helper_text}/>);
      subject.setState({secondsLeft: 0});
      subject.tick();
      expect(subject.state.secondsLeft).toEqual("Start");
      done();
    });

    it('starts the second chat when both players hit the start button', function(done) {
      subject = jasmineReact.render(<Timer turn={2} chatRoom={props.chat_room} handleChange={props.handleChange} currentUser={props.current_user} pusher={new variables.pusher} otherUser={props.other_user} helperText={props.helper_text}/>);
      subject.setState({otherDone: true});
      subject.handleClick();
      expect(subject.state.secondsLeft).toEqual(20);
      done();
    });

    it('does not change the turn unless both players hit start', function(done) {
      subject.setState({turn: 2});
      subject.handleClick();
      expect(subject.state.secondsLeft).toEqual("Start");
      done();
    });

    it('gives final instructions after the second chat', function(done){
      subject = jasmineReact.render(<Timer turn={3} chatRoom={props.chat_room} handleChange={props.handleChange} currentUser={props.current_user} pusher={new variables.pusher} otherUser={props.other_user} helperText={props.helper_text}/>);
      subject.setState({secondsLeft: 0});
      subject.tick();
      expect(subject.state.secondsLeft).toEqual("Game Stats");
      done();
    });

    it('displays message while waiting for other player to be ready', function(done) {
      subject.handleClick();
      expect(document.getElementById('other-player-waiting').className).toEqual('');
      done();
    });

    it('hides the message when the conversation starts', function(done) {
      subject.setState({otherDone: true});
      subject.handleClick();
      subject.setState({turn: 1});
      expect(document.getElementById('other-player-waiting').className).toEqual('hidden');
      done();
    });
  });
});
