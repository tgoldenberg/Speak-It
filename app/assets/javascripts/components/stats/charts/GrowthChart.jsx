var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;

var GrowthChart = React.createClass({
	getInitialState: function() {
		var now = new Date();
		var dates = []; 
		var totalPoints = this.props.points;
		console.log(totalPoints);
		var feedbacks = this.props.feedbacks
		numFeedbacks = 0;
		for (i=7; i>=0; i--){
			var next = now - i*1000*3600*24
			dates.push(new Date(next))
			// console.log(dates);
		}
		dates = dates.map(function(myDate) {
			// console.log(date.getYear());
			var month = myDate.getMonth(); 
			var date = myDate.getDate();
			var count = 0;
			feedbacks.map(function(feedback) {
				var tempDate = new Date(feedback.created_at)
				var tempDateDate = tempDate.getDate();
				var tempDateMonth = tempDate.getMonth();
				if (tempDateDate == date && tempDateMonth == month) {
					count += 1;
					numFeedbacks += 1;
				}
			});
			return {x: myDate, y: count}
		});
		console.log(dates)
		return {
			data: {label: 'user chats', values: dates},
			xScale: d3.time.scale().domain([dates[0].x, dates[dates.length-1].x]).range([0, 800]),
            xScaleBrush: d3.time.scale().domain([dates[0].x, dates[dates.length-1].x]).range([0, 400 - 70]),
            numFeedbacks: numFeedbacks
		}
	},
	render: function() {
		return (
			    <div className="line-chart-wrapper">
			    	<p className="line-chart-header"> Weekly Growth </p>
	                <LineChart 
	                	data={this.state.data}
	                	width={1000}
	                	height={300}
	                	margin={{top: 10, bottom: 50, left: 50, right: 20}}
	                	xScale={this.state.xScale}
	                	xAxis={{tickValues: this.state.xScale.ticks(d3.time.day, 1), tickFormat: d3.time.format("%m/%d")}}
	                	yAxis={{label: "user chats"}}
	                	stroke={{strokeDasharray: "4 4 4", strokeWidth: "4 4 4"}}
	                >
	                </LineChart>

                <p className="num-chats">Growth this week: {this.state.numFeedbacks}</p>
                </div>
		)
	},
	 _onChange: function(extent) {
        this.setState({xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, 400 - 70])});
    }
})