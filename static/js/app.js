  
/* data route */
function testPlotly(name){
var yes=name;
console.log('yes')
console.log(yes)
console.log('yes')
}


var url = "/names";
function init() {
    Plotly.d3.json(url, function(error, names)
    {
        //console.log(names[0]);

        var select = Plotly.d3.select('#selDataset')
        .on("change", function() {
            var name = Plotly.d3.select(this).node().value;
            //console.log(name);
            testPlotly(name);
        });
        select.selectAll('option')
        .data(names)
        .enter()
        .append('option')

        .text(d => d)
        .attr("value", function(d){return d;})
    }
   
    
    );
    
}





init();