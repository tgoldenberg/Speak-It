var deleteInvitation = function() {
  $('.delete_invitation').on('click', function(e) {
    console.log("CLICK");
    var target = $(e.target);
    e.preventDefault();
    var invitationId = parseInt($(this).data('id'));
    $.ajax({
      url: '/invitations',
      method: 'delete',
      dataType: 'json',
      data: {invitation: {id: invitationId}}
    })
    .done(function(data) {
      console.log(data);
      console.log(target);
      target.parent().hide();
      $('#notification-list').toggle();
    })
    .fail(function(err) {
      console.log(err);
    });
  });
};
