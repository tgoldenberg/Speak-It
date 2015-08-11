var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var InvitationModule = rewire(__component_base + '/calls/Invitation');
var Invitation = InvitationModule.component;

fdescribe('Invitation', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    InvitationModule.__set__({
     'Calling': jasmineReact.createStubComponent(window, "Calling")
   });
    subject = jasmineReact.render(<Invitation chat={props.first_chat}/>);
    done();
  });

  describe('.initialState', function(done) {
    it('calls the other user', function(done) {

      expect(document.getElementById('title_native').innerHTML).toEqual('Native Speaker: Marcos');
      done();
    });

    it('hangs up when the call is toggled', function(done) {
      done();
    })
  });
});
