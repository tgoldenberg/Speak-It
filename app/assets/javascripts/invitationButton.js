function get_gravatar(email, size) {
    console.log(email);
    var size = size || 80;
    return 'http://www.gravatar.com/avatar/' + md5(email) + '.jpg?s=' + size;
}
var removeFlash = function() {
  setTimeout(function(){
    $('.notice').remove();
    $('.alert').remove();
  }, 3500);
};

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
  console.log("total", total);
  $('#hidden_rating_field').val(total);
};

var createFlag = function(e) {
  var images = ["https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/english.jpg",
                "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/spain.png",
                "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/chinese.png"
              ];
  console.log("GIVE ME A FLAG", e);
  var value = parseInt($(e)[0].value);
  $(e).next()[0].src = images[value-1];
};
var omniauthCreateFlag = function(e) {
  var images = ["https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/english.jpg",
                "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/spain.png",
                "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/chinese.png"
              ];
  console.log("GIVE ME A FLAG", e);
  var value = parseInt($(e)[0].value);
  $(e).parent().next().children().first()[0].src = images[value-1];
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
    $('.call-box').removeClass('hidden');
  });
};
