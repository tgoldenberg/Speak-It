// function for listening to a button click in order to delete an invitation
var deleteInvitation = function() {
  $('.delete_invitation').on('click', function(e) {
    var target = $(e.target);
    e.preventDefault();
    var invitationId = parseInt($(this).data('id'));
    // call to the invitations#destroy action
    $.ajax({
      url: '/invitations',
      method: 'delete',
      dataType: 'json',
      data: {invitation: {id: invitationId}}
    })
    .done(function(data) {
      // hide the <li> tag with the buttons
      target.parent().hide();
      $('#notification-list').toggle();
    })
    .fail(function(err) {
      console.log(err);
    });
  });
};

var removeFlash = function() {
  setTimeout(function(){
    $('.notice').remove();
    $('.alert').remove();
  }, 3500);
};
