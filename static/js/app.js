  
/* data route */
var url = "/names";

function init() {
    Plotly.d3.json(url, function(error, names) 
    {
        console.log(names[0]);

        Plotly.d3.select('#selDataset')
        .selectAll('option')
        .data(names)
        .enter()
        .append('option')
        .on("change", function() {
            var name = d3.select(this).node().value;
            console.log(name);
        })
        .attr("value", function(d){return d;})


    
    });

}





init();