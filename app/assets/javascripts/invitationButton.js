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
  $('.notifications').on('click', function(e) {
    $('.notifications').removeClass('gradient-pulse');
  });
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
}

var createFlag = function(e) {
  var images = ["https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/english.jpg",
                "https://raw.githubusercontent.com/tgoldenberg/Speakit-Static/master/app/assets/images/spain.png"];
  console.log("GIVE ME A FLAG", e);
  var value = parseInt($(e)[0].value);
  $(e).next()[0].src = images[value-1];
};
var countries = [
  {name: "United States", image_url: "/assets/american-flag-medium-ffc6ff0f18e62f073102fd8438fbc46aeafff492afa3bbe7f19008a67f39bd25.png"},
  {name: "Canada", image_url: "/assets/canadian-flag-medium-c3d70ff226a8d78093192f0f9bb2e0cf5ae378041207565dcccf52c17b9e89fe.png"},
  {name: "Mexico", image_url: "/assets/mexican-flag-medium-987e26f1af1580ba80dbef3b70dc1ee358a8d0c9512aadf31398737ee406575e.png"},
  {name: "Spain", image_url: "/assets/spanish-flag-medium-d0eb8f423f15676f3ada280361e41396a23327bcef512f317f523b171bc1e379.png"},
  {name: "Argentina", image_url: "/assets/argentinian-flag-medium-0f5cd5837730e641f7bb7065c2d80e92b6900d003971337d1087f7d6cec68120.png"},
  {name: "Columbia", image_url:  "/assets/colombian-flag-medium-edca207cf5af9f6bdfc36bc1d92effd8839445d5b83a65b30fa3efb1649efc66.png"},
  {name: "Peru", image_url: "/assets/peruvian-flag-medium-5be6886dd178de1ab59f1d7f82d780b3eee2e016f4d51744d8682844793e949c.png" },
  {name: "United Kingdom", image_url: "/assets/british-flag-medium-456ad9cb1836b6a3e5e622bab09d92974ec2ef78a8ca168651d5e2a48a682409.png"},
  {name: "Venezuela", image_url: "/assets/venezuelan-flag-medium-537b8d555b9b9ce05dd476acfdd0c68c330310bf159cf66c181d485ead43c9ed.png"},
  {name: "Ecuador", image_url: "/assets/ecuadorian-flag-medium-14a4ec554807a5c80b119d0a0514e0280db0827fc4894578d7601b51b36cf04f.png"},
  {name: "Cuba", image_url: "/assets/cuban-flag-medium-9238ad1e3843d833914f4b6e831e5fbc3c371c4b2ead9eb5c5815bb4436b59fb.png"},
  {name: "Uruguay", image_url: "/assets/uruguayan-flag-medium-7da5facaa7f5aad65b8080d666628cb61032bafc13e8b110d2cd73fe59650132.png"},
  {name: "Costa Rica", image_url: "/assets/costa-rican-flag-medium-11da33e08de714a9eea5919fb3bc045eb2e9e08722be777329657c128eb367f5.png"},
  {name: "Guatemala", image_url: "/assets/guatemalan-flag-medium-e3008a48b22ceec4fc80466ecd14dcd4b0952c333e79f6794b5a668537a2719f.png"},
  {name: "Panama", image_url: "/assets/panamanian-flag-medium-ae50a36d6485f0859e41a534b36bdeccea8dc71f5b93cad25c8cf524d30aeb81.png"},
  {name: "Chile", image_url: "/assets/chilean-flag-medium-895fa875a3289e8c0dbf9cb8260a1502c690b8b8379c39500c4ffe868e2db92a.png"},
  {name: "Dominican Republic", image_url: "/assets/dominican-republic-flag-medium-1f0305af1de98aeba33c063b13e4b3d228f61034e18494c9ab8202bd5e8b9bda.png"}
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
