var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var ChatRoomModule = rewire(__component_base + '/ChatRoom');
var ChatRoom = ChatRoomModule.component;

fdescribe('ChatRoom', function(done){
  var variables = require('../fixtures/occupationable');
  var props = variables.props;
  var pusher = variables.pusher;
  var guid = function() {};
  var getUserMedia = function(options, callback) {
    callback(108);
  };
  var ajaxUpdate = function(options) {};

  beforeEach(function(done) {
    ChatRoomModule.__set__({
     'InfoPanel': jasmineReact.createStubComponent(window, "InfoPanel"),
     'Title': jasmineReact.createStubComponent(window, "Title"),
     'SmallVideos': jasmineReact.createStubComponent(window, "SmallVideos"),
     'FinalInstructions': jasmineReact.createStubComponent(window, "FinalInstructions"),
     'VideoChat': jasmineReact.createStubComponent(window, "VideoChat"),
     'GameStats': jasmineReact.createStubComponent(window, "GameStats"),
     'Pusher': pusher,
     'guid' : guid,
     'navigator.getUserMedia': guid
   });
    subject = jasmineReact.render(<ChatRoom current_user={props.current_user} other_user={props.other_user} chat_room={props.chat_room} completed={false} turn={0} first_chat={props.first_chat}/>);
    subject.ajaxUpdate = ajaxUpdate;
    done();
  });

  describe('.initialState', function(done) {
    it('starts with correct state', function(done) {
      expect(subject.state.turn).toEqual(0);
      done();
    });

    it('should set the users media stream', function(done) {
      getUserMedia({}, function(stream) {
        subject.setState({currentUserRTC: stream});
      }.bind(this));
      expect(subject.state.currentUserRTC).toEqual(108);
      done();
    });

    it('should change the turn correctly', function(done) {
      subject.changeTurn();
      expect(subject.state.turn).toEqual(1);
      done();
    })
  });
});
