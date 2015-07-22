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

var createFlag = function(e) {
  var images = ["https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/english.jpg",
                "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/spain.png"];
  console.log("GIVE ME A FLAG", e);
  var value = parseInt($(e)[0].value);
  $(e).next()[0].src = images[value-1];
};
var countries = [
  {name: "United States", image_url: "american-flag-medium.png"},
  {name: "Canada", image_url: "canadian-flag-medium.png"},
  {name: "Mexico", image_url: "mexican-flag-medium.png"},
  {name: "Spain", image_url: "spanish-flag-medium.png"},
  {name: "Argentina", image_url: "argentinian-flag-medium.png"},
  {name: "Columbia", image_url: "colombian-flag-medium.png"},
  {name: "Peru", image_url: "peruvian-flag-medium.png" },
  {name: "United Kingdom", image_url: "british-flag-medium.png"},
  {name: "Venezuela", image_url: "venezuelan-flag-medium.png"},
  {name: "Ecuador", image_url: "ecuadorian-flag-medium.png"},
  {name: "Cuba", image_url: "cuban-flag-medium.png"},
  {name: "Uruguay", image_url: "uruguayan-flag-medium.png"},
  {name: "Costa Rica", image_url: "costa-rican-flag-medium.png"},
  {name: "Guatemala", image_url: "guatemalan-flag-medium.png"},
  {name: "Panama", image_url: "panamanian-flag-medium.png"},
  {name: "Chile", image_url: "chilean-flag-medium.png"},
  {name: "Dominican Republic", image_url: "dominican-republic-flag-medium.png"}
];
var createFlagForCountry = function(e) {
  var value = parseInt($(e)[0].value);
  var selectedCountry = countries[value -1];
  $(e).next()[0].src = "/assets/" + selectedCountry.image_url;
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
