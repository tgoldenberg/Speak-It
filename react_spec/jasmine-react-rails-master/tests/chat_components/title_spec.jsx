var ReactHelper = require(react_helper_path);
var rewire = require('rewire');
var TitleModule = rewire(__component_base + '/Title');
var Title = TitleModule.component;

describe('Title', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    TitleModule.__set__({
     'LargeVideo': jasmineReact.createStubComponent(window, "LargeVideo")
   });
    subject = jasmineReact.render(<Title chat={props.first_chat}/>);
    done();
  });

  describe('.initialState', function(done) {
    it('displays the level', function(done) {
      expect(document.getElementById('title_level').innerHTML).toEqual('Level: (1) beginner');
      done();
    });

    it('changes information when the currentChat changes', function(done) {
      subject = jasmineReact.render(<Title chat={props.second_chat}/>);
      expect(document.getElementById('avatar_image').src).toEqual('http://www.gravatar.com/avatar/35db3bb05d401f30e8f56885aa194e11.jpg?s=80');
      done();
    });
  });
});
