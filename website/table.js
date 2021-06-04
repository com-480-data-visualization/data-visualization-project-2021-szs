var margin_table = {top: 50, right: 30, bottom: 20, left: 30},
    width_table= 200 - margin_table.left - margin_table.right,
    height_table= 900 - margin_table.top - margin_table.bottom;


var svg_table = d3.select("#my_dataviz_timeline")
    .append("svg")
    .attr("width", 200)
    .attr("height", 900)
    .append("g")
    // .attr("transform",
    //     "translate(" + 10 + "," + 1.5*margin_table.top + ")");


var tip_table = d3.tip()
    .attr('class', 'd3-tip')
    .offset(function(d){
        return [0, 0]
    })
    .html(function(d) {
        return d.team_long_name_x;
    });

svg_table.call(tip_table);


var click_table = function(d){
    team = d.team_long_name_x
    season = d.season
    show_team(season, team, "-")
    location.href = "#layer3"
}

function show_table(season, country) {
    var League_name = country_league.get(country)
    svg_table.selectAll("*").remove();

    d3.csv("data/csv/teams.csv", function(data) {


        var data = data.filter(function(d)
        {
            if(( d["season"] === season) && (d["League_name"]===League_name))
            {
                return d;
            }
        })

        var u = svg_table.selectAll("circle")
            .data(data)

        u.enter()
            .append("svg:image")
            .attr('x', function(d)  {return  10;})
            .attr('y', function(d) { return d.rank*40 + 25; })
            .attr('width', 30)
            .attr('height', 30)
            .attr("xlink:href", function(d){return "images/team/" + d.pic_idx +".png";})
            .on("mouseover", tip_table.show)
            .on("mouseleave", tip_table.hide)
            .style("cursor", "pointer")
            .on("click", function(d){return click_table(d);});

        var u = svg_table.selectAll("text")
            .data(data)

        u.enter()
            .append("text")
            .attr('x', function(d)  {return  60;})
            .attr('y', function(d) { return d.rank*40 + 45; })
            .text(function(d) { return d["W"]; })
            .attr('width', 20)
            .attr('height', 20)
            .attr("font-size",10)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        u.enter()
            .append("text")
            .attr('x', function(d)  {return  80;})
            .attr('y', function(d) { return d.rank*40 + 45; })
            .text(function(d) { return d["D"]; })
            .attr('width', 20)
            .attr('height', 20)
            .attr("font-size",10)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        u.enter()
            .append("text")
            .attr('x', function(d)  {return  100;})
            .attr('y', function(d) { return d.rank*40 + 45; })
            .text(function(d) { return d["L"]; })
            .attr('width', 20)
            .attr('height', 20)
            .attr("font-size",10)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        u.enter()
            .append("text")
            .attr('x', function(d)  {return  120;})
            .attr('y', function(d) { return d.rank*40 + 45; })
            .text(function(d) { return d["Pts"]; })
            .attr('width', 20)
            .attr('height', 20)
            .attr("font-size",10)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        u.enter()
            .append("text")
            .attr('x', function(d)  {return  150;})
            .attr('y', function(d) { return d.rank*40 + 45; })
            .text(function(d) { return d["rank"]; })
            .attr('width', 20)
            .attr('height', 20)
            .attr("font-size",10)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        svg_table.append("text")
            .attr("x", 25)
            .attr("y", 45)
            .text("Team")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr("font-weight", 200)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        svg_table.append("text")
            .attr("x", 60)
            .attr("y", 45)
            .text("W")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr("font-weight", 200)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        svg_table.append("text")
            .attr("x", 80)
            .attr("y", 45)
            .text("D")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr("font-weight", 200)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        svg_table.append("text")
            .attr("x", 100)
            .attr("y", 45)
            .text("L")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr("font-weight", 200)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        svg_table.append("text")
            .attr("x", 120)
            .attr("y", 45)
            .text("Pts")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr("font-weight", 200)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        svg_table.append("text")
            .attr("x", 150)
            .attr("y", 45)
            .text("Rank")
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr("font-weight", 200)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");
    })
}

show_table(season, country)