var LineChart = ReactD3.LineChart;
var Brush = ReactD3.Brush;


var MonthlyChart = React.createClass({
	getInitialState: function() {
		var now = new Date();
		var dates = []; 
		var chats = this.props.chats
		var numChats = 0;
		for (i=30; i>=0; i--){
			var next = now - i*1000*3600*24
			dates.push(new Date(next))
			// console.log(dates);
		}
		dates = dates.map(function(myDate) {
			// console.log(date.getYear());
			var month = myDate.getMonth(); 
			var date = myDate.getDate();
			var count = 0;
			chats.map(function(chat) {
				var tempDate = new Date(chat.created_at)
				var tempDateDate = tempDate.getDate();
				var tempDateMonth = tempDate.getMonth();
				if (tempDateDate == date && tempDateMonth == month) {
					count += 1;
					numChats += 1;
				}
			});
			return {x: myDate, y: count}
		});
		console.log(dates)
		return {
			data: {label: '', values: dates},
			xScale: d3.time.scale().domain([dates[0].x, dates[dates.length-1].x]).range([0, 800]),
            xScaleBrush: d3.time.scale().domain([dates[0].x, dates[dates.length-1].x]).range([0, 400 - 70]),
            numChats: numChats
		}
	},
	render: function() {
		return (
			    <div className="line-chart-wrapper">
				    <p className="line-chart-header"> Chats this month </p>
	                <LineChart 
	                	data={this.state.data}
	                	width={1000}
	                	height={300}
	                	margin={{top: 10, bottom: 50, left: 50, right: 20}}
	                	xScale={this.state.xScale}
	                	xAxis={{tickValues: this.state.xScale.ticks(d3.time.week, 1), tickFormat: d3.time.format("%m/%d")}}
	                	yAxis={{label: "user chats"}}
	                	
	                >
	                </LineChart>

                <p className="num-chats">Chats this month: {this.state.numChats}</p>
                </div>
		)
	},
	 _onChange: function(extent) {
        this.setState({xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, 400 - 70])});
    }
})