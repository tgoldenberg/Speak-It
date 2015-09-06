var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;

var Activity = React.createClass({
	getInitialState: function() {
		return {
			chart: "Week",
			growthChart: "Week",
			growthDays: 7
		};
	},
	changeChart: function(e) {
		e.preventDefault();
		this.setState({chart: $(e.target).html()});
	},
	changeGrowthChart: function(e) {
		e.preventDefault();
		var days = $(e.target).html();
		var numDays = 7;
		if (days == "Quarter") {
			numDays = 120;
		} else if (days == "Month") {
			numDays = 30;
		}
		this.setState({
			growthChart: $(e.target).html(),
			growthDays: numDays
		});
	},
	render: function() {
		var chart = this.state.chart;
		switch(chart) {
			case "Week":
			chart = <WeeklyChart chats={this.props.chats} />;
			break;
			case "Month":
				chart = <MonthlyChart chats={this.props.chats}/>;
				break;
			case "Quarter":
				chart = <QuarterlyChart chats={this.props.chats}/>;
				break;
			default: 
				chart = <WeeklyChart chats={this.props.chats}/>;	
			}
		var growthChart = this.state.growthChart;
		switch(growthChart) {
			case "Week":
			growthChart = <WeeklyGrowthChart feedbacks={this.props.feedbacks} points={this.props.points} />;
			break;
			case "Month":
				growthChart = <MonthlyGrowthChart feedbacks={this.props.feedbacks} points={this.props.points}/>;
				break;
			case "Quarter":
				growthChart = <QuarterlyGrowthChart feedbacks={this.props.feedbacks} points={this.props.points}/>;
				break;
			default: 
				growthChart = <WeeklyGrowthChart feedbacks={this.props.feedbacks} points={this.props.points}/>;	
			}
		return (
			<div className="stats-holder tab-pane active" id="activity">
				<div className="date-selector">
		    		<a href="#" onClick={this.changeChart}>Week</a>
		    		<a href="#" onClick={this.changeChart}>Month</a>
		    		<a href="#" onClick={this.changeChart}>Quarter</a>
		    	</div>
				<div>{chart}</div><br/>
				<div className="date-selector">
		    		<a href="#" onClick={this.changeGrowthChart}>Week</a>
		    		<a href="#" onClick={this.changeGrowthChart}>Month</a>
		    		<a href="#" onClick={this.changeGrowthChart}>Quarter</a>
		    	</div>
				<div>
					{growthChart}
				</div>	
			</div>
		)
	}
})