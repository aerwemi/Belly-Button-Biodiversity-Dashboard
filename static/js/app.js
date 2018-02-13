  
/* data route */
function testPlotly(name){
    var url2= '/metadata/' + name;
    console.log(url2);

    Plotly.d3.json(url2, function(error, metaData)
    {
        console.log(metaData);
        Plotly.d3.select("tbody")
            .selectAll("tr")
            .data(metaData)
            .enter()
            .append("tr")
            .html(function(d) {
                return `<td>${d.t0}</td><td>${d.t1}</td>`
    });
    }
    
);
        



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