var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;

var Stats = React.createClass({
	getInitialState: function() {
		return {chart: "Week"};
	},
	changeChart: function(e) {
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
				<div className="stats-holder">
					<div className="date-selector">
			    		<span onClick={this.changeChart} className="btn btn-primary">Week</span>
			    		<span onClick={this.changeChart} className="btn btn-primary">Month</span>
			    		<span onClick={this.changeChart} className="btn btn-primary">Quarter</span>
			    	</div>
					<div>{chart}</div>	
				</div>
		)
					
	}
});