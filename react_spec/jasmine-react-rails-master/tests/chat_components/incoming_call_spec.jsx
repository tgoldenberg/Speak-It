var ReactHelper = require(react_helper_path);
var IncomingCall = require(__component_base + '/calls/IncomingCall').component;

describe('IncomingCall', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;
  var invitation = {invitation: props.invitation, sender: props.other_user.user};

  beforeEach(function(done) {
    var declineCall = function() {};
    subject = jasmineReact.render(<IncomingCall
                                    invitation={invitation}
                                    declineCall={declineCall}
                                    helperText={props.helper_text}/>);
    subject.createMissedCall = function() {};
    subject.createDeclinedCall = function() {};
    done();
  });

  describe('.initialState', function(done) {
    it('initializes timer to 0', function(done) {
      expect(subject.state.timer).toEqual(0);
      done();
    });

    it('increases timer up to 12', function(done) {
      subject.tick();
      expect(subject.state.timer).toEqual(1);
      done();
    });

    it('times out at 12 seconds', function(done) {
      subject.setState({timer: 11});
      subject.tick();
      expect(subject.state.timer).toEqual(0);
      done();
    });

    it('declines the call', function(done) {
      subject.setState({timer: 5});
      subject.declineCall();
      expect(subject.state.timer).toEqual(0);
      done();
    });

    it('displays information about call', function(done) {
      expect(document.getElementById('calling_info').innerHTML).toEqual('Incoming call from  marcos...');
      done();
    });
  });
});
