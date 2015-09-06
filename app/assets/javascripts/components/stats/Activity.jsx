var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;

var Activity = React.createClass({
	getInitialState: function() {
		return {chart: "Week"};
	},
	changeChart: function(e) {
		e.preventDefault();
		this.setState({chart: $(e.target).html()});
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
		return (
			<div className="stats-holder tab-pane active" id="activity">
				<div className="date-selector">
		    		<a href="#" onClick={this.changeChart}>Week</a>
		    		<a href="#" onClick={this.changeChart}>Month</a>
		    		<a href="#" onClick={this.changeChart}>Quarter</a>
		    	</div>
				<div>{chart}</div><br/>
				<div><GrowthChart feedbacks={this.props.feedbacks} points={this.props.points} /></div>	
			</div>
		)
	}
})