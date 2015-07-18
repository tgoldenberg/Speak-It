$(document).ready(function(){
	
	$('#available-tab').on('click',function(e){
		e.preventDefault();
		 console.log('available');
		 $('#recent-table').hide();
		 $('#available-table').show();

	})
	$('#recent-tab').on('click',function(e){
		e.preventDefault();
		console.log('recent')
		$('#available-table').hide();
		$('#recent-table').show();
	})
})