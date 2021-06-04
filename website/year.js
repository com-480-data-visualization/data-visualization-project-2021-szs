var svg_year = d3.select("#my_dataviz_legend_timeline")
    .append("svg")
    .attr("width", 150)
    .attr("height",900)
    .append("g")



var click_year = function(d){
    show_team(d.Year, 123, country_league.get(d.Country))
    show_table(d.Year, d.Country)
    show_country(d.Country, d.Year)
}

function show_year(country) {
    svg_year.selectAll("*").remove();


    d3.csv("data/csv/year.csv", function(data) {

        var data = data.filter(function(d)
        {
            if(( d["Country"] === country))
            {
                return d;
            }
        })

        var u = svg_year.selectAll("text")
            .data(data)

        u.enter()
            .append("text")
            .attr('x', function(d) {return  35;})
            .attr('y', function(d) { return d.NO*31.5 + 113; })
            .text(function(d) { return d.Year; })
            .attr('width', 2)
            .attr('height', 20)
            .attr("font-size",17)
            .attr("font-family","Oswald")
            .style("cursor", "pointer")
            .on("click", function(d){return click_year(d);});

        // u.enter()
        //     .append("image")
        //     .attr('x', function(d) {return  5;})
        //     .attr('y', function(d) { return d.NO*30 + 100; })
        //     .attr("xlink:href", function(d){return "images/ball.png";})
        //     .attr('width', 20)
        //     .attr('height', 20)
        //     .style("cursor", "pointer")
        //     .on("click", function(d){return click_year(d);});

        svg_year.append("text")
            .attr("x", 75)
            .attr("y", 80)
            .text("season")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "20px")
            .attr("font-weight", 400)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");
    })


}
show_year(country)



