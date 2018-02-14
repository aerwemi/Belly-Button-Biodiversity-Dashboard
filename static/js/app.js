
/* data route */
function testPlotly(name) {
    var url2 = '/metadata/' + name;
    var url3 = '/samples/' + name;
    console.log(url3);

    Plotly.d3.json(url2, function (error, metaData) {
        console.log(metaData);
        Plotly.d3.select("tbody")
            .html("")
            .selectAll("tr")
            .data(metaData)
            .enter()
            .append("tr")
            .html(function (d) {
                return `<td>${d.t0}</td><td>${d.t1}</td>`
            });
    }

    );

    Plotly.d3.json(url3, function (error, pieData) {
        //console.log(pieData);
        var labels0 = pieData['otu_id']
        //console.log(labels)
        var values0 = pieData['sample_values']
        //console.log(values)
        var data = [{
            values: values0,
            labels: labels0,
            type: "pie"
          }];

        var layout = {
           height: 500,
           width: 700
         };
        Plotly.newPlot("plot1", data, layout);
    });
}

//part 1
var url = "/names";
function init() {
    Plotly.d3.json(url, function (error, names) {
        //console.log(names[0]);

        var select = Plotly.d3.select('#selDataset')
            .on("change", function () {
                var name = Plotly.d3.select(this).node().value;
                //console.log(name);
                testPlotly(name);
            });
        select.selectAll('option')
            .data(names)
            .enter()
            .append('option')

            .text(d => d)
            .attr("value", function (d) { return d; })
    }


    );

}

init();