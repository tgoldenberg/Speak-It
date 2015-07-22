$(document).ready(function(){

	$('#available-tab').on('click',function(e){
		e.preventDefault();
		  if (!$('#available-tab').hasClass('active')) {
				$('#recent-tab').removeClass('active');
				$('#available-tab').addClass('active');
		  }
		  $('#recent-table').hide();
		  $('#available-table').show();

	})
	$('#recent-tab').on('click',function(e){
		e.preventDefault();
		if (!$('#recent-tab').hasClass('active')) {
			$('#available-tab').removeClass('active');
			$('#recent-tab').addClass('active');
		}
		$('#available-table').hide();
		$('#recent-table').show();
	})
})
