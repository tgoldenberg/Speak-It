

var Stats = React.createClass({
	componentDidMount: function() {
		$(document).ready(function () {
		  $('.accordion-tabs').each(function(index) {
		    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
		  });
		  $('.accordion-tabs').on('click', 'li > a.tab-link', function(event) {
		    if (!$(this).hasClass('is-active')) {
		      event.preventDefault();
		      var accordionTabs = $(this).closest('.accordion-tabs');
		      accordionTabs.find('.is-open').removeClass('is-open').hide();

		      $(this).next().toggleClass('is-open').toggle();
		      accordionTabs.find('.is-active').removeClass('is-active');
		      $(this).addClass('is-active');
		    } else {
		      event.preventDefault();
		    }
		  });
		});

	},
	render: function() {
		return (
				<div>
					<ul className="accordion-tabs">
					  <li className="tab-header-and-content">
					    <a href="javascript:void(0)" className="is-active tab-link">Activity</a>
					    <div className="tab-content">
						    <Activity chats={this.props.chats} feedbacks={this.props.feedback} points={this.props.level.value*100 - 100 + this.props.user.points}/>
					    </div>
					  </li>
					  <li className="tab-header-and-content">
					    <a href="javascript:void(0)" className="tab-link">Feedback</a>
					    <div className="tab-content">
					    	<FeedbackStats chats={this.props.chats} feedbacks={this.props.feedback} />
					    </div>
					  </li><li className="tab-header-and-content">
					    <a href="javascript:void(0)" className="tab-link">Chats</a>
					    <div className="tab-content">
					    	<ChatList />
					    </div>
					  </li>
					</ul>
				</div>
		)
					
	}
});