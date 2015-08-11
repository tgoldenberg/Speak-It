var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var InvitationModule = rewire(__component_base + '/calls/Invitation');
var Invitation = InvitationModule.component;

describe('Invitation', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    InvitationModule.__set__({
     'Calling': jasmineReact.createStubComponent(window, "Calling")
   });
    var button = "Chat with Marcos to learn Mandarin";
    subject = jasmineReact.render(<Invitation currentUser={props.current_user} user={props.other_user} helper_text={props.helper_text} language={props.first_chat.language} button={button}/>);
    subject.declineCall = function() {};
    subject.sendInvitation = function() {};
    done();
  });

  describe('.initialState', function(done) {
    it('sets showCall to false', function(done) {
      expect(subject.state.showCall).toEqual(false);
      done();
    });

    it('sets showCall to false on toggle', function(done) {
      subject.toggleCall();
      expect(subject.state.showCall).toEqual(true);
      done();
    });

    it('hangs up on the call timeout', function(done) {
      subject.callTimeout();
      expect(subject.state.showCall).toEqual(false);
      done();
    });
  });
});
