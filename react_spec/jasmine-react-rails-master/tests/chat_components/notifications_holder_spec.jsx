var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var NotificationsHolderModule = rewire(__component_base + '/calls/NotificationsHolder');
var NotificationsHolder = NotificationsHolderModule.component;

describe('NotificationsHolder', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    NotificationsHolderModule.__set__({
     'IncomingCallHolder': jasmineReact.createStubComponent(window, "IncomingCallHolder"),
     'MissedCallList': jasmineReact.createStubComponent(window, "MissedCallList")
    });
    Pusher = variables.pusher;
    removeGradientPulse = function() {};
    subject = jasmineReact.render(<NotificationsHolder
                                    active_invitations={[]}
                                    missed_calls={[]}
                                    currentUser={props.current_user}
                                    helper_text={props.helper_text}
                                     />);
    subject.appendFlash = function() {};
    done();
  });

  describe('.initialState', function(done) {
    it('starts with an empty array for missed calls', function(done) {
      expect(subject.state.missedCalls).toEqual([]);
      done();
    });

    it('initializes with an empty array for active invitations', function(done) {
      expect(subject.state.activeInvitations).toEqual([]);
      done();
    });

    it('declines a call', function(done) {
      subject.setState({activeInvitations: ["This is an invitation"]});
      subject.declineCall();
      expect(subject.state.activeInvitations).toEqual([]);
      done();
    });

    it('shows a missed call when the call times out', function(done) {
      subject.setState({activeInvitations: ["This is an invitation"]});
      var invitation = {invitation: "speak Mandarin", sender: "Marcos"};
      subject.callTimeout(invitation);
      expect(subject.state.missedCalls).toEqual([{ call: 'speak Mandarin', sender: 'Marcos' }]);
      expect(subject.state.activeInvitations).toEqual([]);
      done();
    });
  });
});
