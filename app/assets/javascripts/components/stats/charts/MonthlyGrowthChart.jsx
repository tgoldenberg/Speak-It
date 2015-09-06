var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;

var MonthlyGrowthChart = React.createClass({
	getInitialState: function() {
		var now = new Date();
		var dates = []; 
		var totalPoints = this.props.points;
		var endingPoints = totalPoints;
		var startingPoints = totalPoints;
		
		var feedbacks = this.props.feedbacks
		numFeedbacks = 0;
		for (i=30; i>=0; i--){
			var next = now - i*1000*3600*24
			var date = new Date(next);
			dates.push(date);

			feedbacks.map(function(feedback) {
				var tempDate = new Date(feedback.created_at)
				var tempDateDate = tempDate.getDate();
				var tempDateMonth = tempDate.getMonth();
				
				if (tempDateDate == date.getDate() && tempDateMonth == date.getMonth()) {
					startingPoints -= feedback.rating*10;
				}
			});
		}
		var pointsDiff = endingPoints - startingPoints;
		dates = dates.map(function(myDate) {
			// console.log(date.getYear());
			var month = myDate.getMonth(); 
			var date = myDate.getDate();
			var count = 0;
			var currentPoints = totalPoints;
			feedbacks.map(function(feedback) {
				var tempDate = new Date(feedback.created_at)
				var tempDateDate = tempDate.getDate();
				var tempDateMonth = tempDate.getMonth();
				
				if (tempDateDate == date && tempDateMonth == month) {
					numFeedbacks += 1;
					startingPoints += feedback.rating*10
					// console.log(totalPoints)
				}
			});
			return {x: myDate, y: startingPoints}
		});
		console.log(dates)
		return {
			data: {label: 'user chats', values: dates},
			xScale: d3.time.scale().domain([dates[0].x, dates[dates.length-1].x]).range([0, 800]),
            xScaleBrush: d3.time.scale().domain([dates[0].x, dates[dates.length-1].x]).range([0, 400 - 70]),
            numFeedbacks: numFeedbacks,
            pointsDiff: pointsDiff
		}
	},
	render: function() {
		return (
				<div>
			    <div className="line-chart-wrapper">
			    	<p className="line-chart-header"> Monthly Point Growth </p>
	                <LineChart 
	                	data={this.state.data}
	                	width={1000}
	                	height={300}
	                	margin={{top: 10, bottom: 50, left: 50, right: 20}}
	                	xScale={this.state.xScale}
	                	xAxis={{tickValues: this.state.xScale.ticks(d3.time.week, 1), tickFormat: d3.time.format("%m/%d")}}
	                	yAxis={{label: "user chats"}}
	                	stroke={{strokeDasharray: "4 4 4", strokeWidth: "4 4 4"}}
	                >
	                </LineChart>

                <p className="num-chats">Growth this week: {this.state.pointsDiff} points</p>
                </div>
                </div>
		)
	},
	 _onChange: function(extent) {
        this.setState({xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, 400 - 70])});
    }
})