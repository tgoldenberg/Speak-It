var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var IncomingCallHolderModule = rewire(__component_base + '/calls/IncomingCallHolder');
var IncomingCallHolder = IncomingCallHolderModule.component;

describe('IncomingCallHolder', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    IncomingCallHolderModule.__set__({
     'IncomingCall': jasmineReact.createStubComponent(window, "IncomingCall")
    });
    var declineCall = function() {};
    var callTimeout = function() {};
    subject = jasmineReact.render(<IncomingCallHolder
                                    incomingCalls={["This is an incoming call"]}
                                    callTimeout={callTimeout}
                                    declineCall={declineCall}
                                    helperText={props.helper_text} />);
    done();
  });

  describe('.initialState', function(done) {
    it('shows a notification if there are no calls', function(done) {
      var declineCall = function() {};
      var callTimeout = function() {};
      subject = jasmineReact.render(<IncomingCallHolder
                                      incomingCalls={[]}
                                      callTimeout={callTimeout}
                                      declineCall={declineCall}
                                      helperText={props.helper_text} />);
      expect(document.getElementById('no_calls').innerHTML).toEqual('No active calls');
      done();
    });

    it('shows the calls if there are calls', function(done) {
      expect(document.getElementById('no_calls')).toEqual(null);
      done();
    });
  });
});
