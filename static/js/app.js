  
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
    .attr("value", function(d){return d;})


    
    });

}


function optionChanged() {
    var name = document.getElementById("selDataset").value;

    // Initialize empty arrays to contain our axes
    // var name = this.value;
    console.log(name);
  
    //_Plotly(name);
  };



init();