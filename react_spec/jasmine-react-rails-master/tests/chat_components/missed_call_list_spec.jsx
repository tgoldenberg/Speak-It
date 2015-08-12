var ReactHelper = require(react_helper_path);
var MissedCallList = require(__component_base + '/calls/MissedCallList').component;

describe('MissedCallList', function(done){
  var variables = require('../fixtures/props');
  var props = variables.props;

  beforeEach(function(done) {
    missedCalls = [
                        {
                          sender: props.other_user.user,
                          call: {
                            id: 1,
                            sender_id: 1,
                            recipient_id: 2,
                            created_at: "2015-08-10T14:04:16.527Z"
                          }
                        }
                      ];
    subject = jasmineReact.render(<MissedCallList
                                    missedCalls={[]}
                                    helperText={props.helper_text}
                                  />);
    done();
  });

  describe('.initialState', function(done) {
    it('displays notification when there are no missed calls', function(done) {
      expect(document.getElementById('no_missed').innerHTML).toEqual("No missed calls.");
      done();
    });

    it('displays the missed call when present', function(done) {

      subject = jasmineReact.render(<MissedCallList
                                      missedCalls={missedCalls}
                                      helperText={props.helper_text}
                                    />);
      expect(document.getElementById('missed_call').innerHTML).toEqual('Missed call from MARCOS \nat Mon, Aug 10 2015 10:04');
      done();
    });
  });
});
