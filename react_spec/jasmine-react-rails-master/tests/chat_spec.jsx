// The React Helper sets up the Test DOM and handles dependencies
// react_helper_path and __component_base are globals set in the test runner,
// so you don't need to worry about relative paths
require(react_helper_path);
var variables = require('./fixtures/occupationable');
var props = variables.props;
var Timer = require(__component_base + '/Timer').component;
describe('Timer', function(){
  var value = 0;

  beforeEach(function(done) {
    this.subject = jasmineReact.render(<Timer turn={value} chatRoom={props.chat_room} currentUser={props.current_user} pusher={new variables.pusher} otherUser={props.other_user} helperText={props.helper_text}/>);
    done();
  });


  describe('.initialState', function(done) {
    it('sets value to value', function(done) {

      expect(this.subject.state.turn).toEqual(value);
      done();
    });
  });
});
