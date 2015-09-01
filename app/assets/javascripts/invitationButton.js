function get_gravatar(email, size) {
  var size = size || 80;
  return 'http://www.gravatar.com/avatar/' + md5(email) + '.jpg?s=' + size;
}
var myStream;
var removeFlash = function() {
  setTimeout(function(){
    $('.notice').remove();
    $('.alert').remove();
  }, 3500);
};

var createPartial = function(content) {
  var partial = '<div class="notice"><div id="alert" class="alert alert-danger" role="alert">' +
                  '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>' +
                    content + '</div></div>';
  return partial;
}

var removeGradientPulse = function() {
  $('.notifications').removeClass('gradient-pulse');
}

var createStars = function(e) {
  var value = parseInt($(e)[0].value);
  var stars = $(e).next().children();
  stars.removeClass('bounceIn').addClass('hidden');
  for (i=0; i<value; i++) {
    $(stars[i]).addClass('bounceIn').removeClass('hidden');
  }
  var total = 10 - $('.hidden').length;
  $('#hidden_rating_field').val(total);
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
      });
    }
    $('#missed-call-list').toggleClass('hidden');
    // Remove gradient pulse
    $('.missed').removeClass('gradient-pulse-red');
    $('.call-box').removeClass('hidden');
  });
};
