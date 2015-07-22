var removeFlash = function() {
  setTimeout(function(){
    $('.notice').remove();
    $('.alert').remove();
  }, 3500);
};
var toggleNotifications = function() {
  $('.notifications').on('click', function(e) {
    e.preventDefault();
    $('#notification-list').toggle();
  });
  $('.missed').on('click', function(e) {
    e.preventDefault();
    if ($('#missed-call-list').hasClass('hidden')) {
      var currentUser = $('.data').data('id');
      $.ajax({
        method: "put",
        url: "/invitations/seen",
        data: {invitation: {recipient_id: currentUser}}
      })
      .done(function(data) {
        console.log(data);
      })
      .fail(function(err) {
        console.log(err);
      });
    }
    $('#missed-call-list').toggleClass('hidden');
  });
};
