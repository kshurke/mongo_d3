
var url = "http://localhost:8080/gen_info/aggregate";


d3.json(url, function(data) {
    
    var states = data;
    var states_counts = [];
    states.forEach(function(d,i){
        states_counts.push(d.count)
    })
    
    var arr = states_counts;
    var plot = {
        height: 500,
        width: 1000,
        pad: 5
    };
    
    d3.select("svg").remove();
    
    var svg = d3.select("body").append("svg").attr({
            height: plot.height,
            width: plot.width})
    
    svg.selectAll("rect").data(arr).enter().append("rect").attr({
            height: function(d){return d},
            //width: function(d){return plot.width/arr.length - plot.pad},
            width: 10,
            x: function(d, i){return i * (plot.width/arr.length)},
            y: function(d){return plot.height - d},
            fill: "teal"})
})