var FeedbackStats = React.createClass({
	render: function() {
		var feedbacks = this.props.feedbacks.map(function(feedback) {
			return <Feedback feedback={feedback} />
		});
		return (
			<div>
				<h1 id="feedbacks-header">Feedback Received</h1>
				{feedbacks}
			</div>
		)
	}
});