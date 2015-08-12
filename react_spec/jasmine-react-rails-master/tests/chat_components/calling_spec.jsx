var ReactHelper = require(react_helper_path);
var Calling = require(__component_base + '/calls/Calling').component;

describe('Calling', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;
  beforeEach(function(done) {
    callTimeout = function() {};
    removeFlash = function() {};
    createPartial = function(content) { return content;};
    subject = jasmineReact.render(<Calling user={props.other_user} helperText={props.helper_text} hangUp={callTimeout}/>);
    subject.appendFlash = function() {};
    done();
  });

  describe('.initialState', function(done) {
    it('sets timer to zero', function(done) {
      expect(subject.state.timer).toEqual(0);
      done();
    });

    it('increases the timer up to 9', function(done) {
      subject.tick();
      expect(subject.state.timer).toEqual(1);
      done();
    });

    it('hangs up after the timer reaches 9', function(done) {
      subject.setState({timer: 9});
      subject.tick();
      expect(subject.state.timer).toEqual(0);
      done();
    });

    it('hangs up if the user declines the call', function(done) {
      subject.setState({timer: 5});
      subject.handleClick();
      expect(subject.state.timer).toEqual(0);
      done();
    });
  });
});
