var removeFlash = function() {
  setTimeout(function(){
    $('.notice').remove();
    $('.alert').remove();
  }, 3500);
};
