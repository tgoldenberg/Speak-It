var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var OngoingVideosModule = rewire(__component_base + '/video_chats/OngoingVideos');
var OngoingVideos = OngoingVideosModule.component;

describe('OngoingVideos', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    OngoingVideosModule.__set__({
     'Timer': jasmineReact.createStubComponent(window, "Timer")
   });
    subject = jasmineReact.render(<OngoingVideos pusher={props.pusher} changeTurn={props.changeTurn} chatRoom={props.chat_room} helperText={props.helper_text} currentUser={props.current_user} otherUser={props.other_user} turn={0}/>);
    done();
  });

  describe('.initialState', function(done) {
    it('display the participant video', function(done) {
      expect(document.getElementById('local-video-username').innerHTML).toEqual('Me');
      done();
    });

    it('displays the other users video', function(done) {
      expect(document.getElementById('remote-video-username').innerHTML).toEqual('MARCOS');
      done();
    });
  });
});
