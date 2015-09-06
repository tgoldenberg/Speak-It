var Feedback = React.createClass({
	render: function() {
		console.log(this.props.feedback);
		var comment = this.props.feedback.comment;
		var pronunciation = this.props.feedback.pronunciation;
		var vocabulary = this.props.feedback.vocabulary;
		var descriptive = this.props.feedback.descriptive;
		var author = this.props.feedback.author;
		var total = pronunciation + vocabulary + descriptive;
		function prettyDate(date, startDate) {
		  var secs = Math.floor((date.getTime() - startDate.getTime()) / 1000);
		  if (secs < 60) return secs + " sec(s) ago";
		  if (secs < 3600) return Math.floor(secs / 60) + " min(s) ago";
		  if (secs < 86400) return Math.floor(secs / 3600) + " hour(s) ago";
		  if (secs < 604800) return Math.floor(secs / 86400) + " day(s) ago";
		  return date.toDateString();
		}
		var receivedDate = prettyDate(new Date(), new Date(this.props.feedback.created_at));
		return (
			<div className="well feedback-holder">
				<p>Submitted by: {author}</p>
				<p>Message: {comment}</p>
				<p className="tiny-font">Received on: {receivedDate}</p>
				<table className="table table-striped table-bordered feedback-table">
					<thead>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					<tr>
						<td>Pronunciation: </td>
						<td>{pronunciation} / 3</td>
					</tr>
					<tr>
						<td>Vocabulary: </td>
						<td>{vocabulary} / 3</td>
					</tr>
					<tr>
						<td>Descriptiveness: </td>
						<td>{descriptive} / 3</td>
					</tr>
					<tr>
						<td>Total Score: </td>
						<td>{total} / 9</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
})