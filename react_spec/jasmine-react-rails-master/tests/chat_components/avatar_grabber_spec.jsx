var ReactHelper = require(react_helper_path);
var AvatarGrabber = require(__component_base + '/forms/AvatarGrabber').component;

describe('AvatarGrabber', function(done){
  beforeEach(function(done) {
    get_gravatar = function(content) { return content;};
    subject = jasmineReact.render(<AvatarGrabber/>);
    subject.setURL = function() {};
    done();
  });

  describe('.initialState', function(done) {
    it('initializes with blank text', function(done) {
      expect(subject.state.text).toEqual("");
      done();
    });

    it('changes the text with user input', function(done) {
      var domElement = TestUtils.findRenderedDOMComponentWithClass(subject, 'form-control');
      TestUtils.Simulate.change(domElement, { target: { value: "user@example.com" } });
      expect(subject.state.text).toEqual("user@example.com");
      done();
    });

    it('accepts a valid URL', function(done) {
      var domElement = TestUtils.findRenderedDOMComponentWithClass(subject, 'form-control');
      TestUtils.Simulate.change(domElement, { target: { value: "user@example.com" } });
      expect(subject.state.url).toEqual("user@example.com");
      done();
    });

    it('does not accept an invalid URL', function(done) {
      var domElement = TestUtils.findRenderedDOMComponentWithClass(subject, 'form-control');
      TestUtils.Simulate.change(domElement, { target: { value: "user" } });
      expect(subject.state.url).toEqual("https://i1.wp.com/design.atlassian.com/1.4/images/avatars/default-user/192/user-avatar-blue-96%402x.png?ssl=1");
      done();
    });
  });
});
