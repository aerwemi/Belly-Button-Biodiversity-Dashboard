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
    });

}

console.log(names)

init();


    