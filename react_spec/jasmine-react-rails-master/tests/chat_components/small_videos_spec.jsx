var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var SmallVideosModule = rewire(__component_base + '/video_chats/SmallVideos');
var SmallVideos = SmallVideosModule.component;

describe('SmallVideos', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    SmallVideosModule.__set__({
     'OngoingVideos': jasmineReact.createStubComponent(window, "OngoingVideos")
   });
    subject = jasmineReact.render(<SmallVideos completed={false} changeTurn={props.changeTurn} otherUser={props.other_user} currentUser={props.current_user} chatRoom={props.chat_room} helperText={props.helper_text} turn={0} pusher={props.pusher}/>);
    done();
  });

  describe('.initialState', function(done) {
    it('shows videos when not completed', function(done) {
      expect(document.getElementById('completed-video')).toEqual(null);
      done();
    });

    it('does not render videos when completed', function(done) {
      subject = jasmineReact.render(<SmallVideos completed={true} changeTurn={props.changeTurn} otherUser={props.other_user} currentUser={props.current_user} chatRoom={props.chat_room} helperText={props.helper_text} turn={0} pusher={props.pusher}/>);
      expect(document.getElementById('completed-video')).not.toEqual(null);
      done();
    });
  });
});
