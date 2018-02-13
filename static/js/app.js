  
/* data route */
var url = "/names";

function init() {
    Plotly.d3.json(url, function(error, names) 
    {
        console.log(names);

    Plotly.d3.select('#selDataset')
    .selectAll('option')
    .data(names)
    .enter()
    .append('option')
    .on("change", optionChanged)
    .attr("value", function(d){return d;})
    
    console.log(d);


    
    });

}





init();