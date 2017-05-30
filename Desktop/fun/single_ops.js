function getData(){

var provider_id = document.getElementById("provider_id").value
var url = "http://localhost:8080/gen_info/" + String(provider_id);

d3.json(url, function(data) {
    
    var hospital = data[0]
    
    document.getElementById("hospital_name").innerHTML = hospital.hospital_name
    document.getElementById("location_state").innerHTML = hospital.location_state
    
    var arr = [1,10,15,20,25,30];
    var plot = {
        height: 100,
        width: 200,
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
            y: function(d){return plot.height - d}})
})
}