var height_country = 500
var width_country = (window.innerWidth - 400)/2

var svg_country = d3.select("#layer2")
    .append("svg")
    .attr("width", width_country)
    .attr("height", height_country);


var tip_country = d3.tip()
    .attr('class', 'd3-tip')
    .offset(function(d){
        return [0, 0]
    })
    .html(function(d) {
        var url = "images/team/" + d.pic_idx +".png"
            return '<img src="'+url+'" width="20" height="20"/>' + d["team_long_name_x"];

    });

var click_country = function(d){
    team = d.team_long_name_x
    season = d.season
    show_team(season, team, "-")
    location.href = "#layer3"
}

svg_country.call(tip_country);

function show_country(country, season) {
    var scale = country_scale.get(country)
    var center_1 = country_center_1.get(country)
    var center_2 = country_center_2.get(country)
    var League_name = country_league.get(country)
    svg_country.selectAll("*").remove();
    var projection_country = d3.geoMercator().scale(scale).center([center_1, center_2]);
    var path_country = d3.geoPath().projection(projection_country);



    d3.queue()
        .defer(d3.json, "data/" + country + ".json")
        .await(show_show_country);

    function show_show_country(error, topo) {
        if (error) throw error;

        svg_country.selectAll("path").remove();
        //svg.selectAll("g").remove();  // to see the legend

        // Draw the map
        var g_map = svg_country.append("g")
            .attr("class", "countries")
            .selectAll("path")
            .data(topo.features)
            .enter().append("path")
            .attr('class','country')
            .attr("d", path_country)
            .attr("stroke",color_eu_1)
            .attr("stroke-width",2.5)
            .attr("fill",color_eu_2)
            .on("mouseover",function(d,i){
                d3.select(this)
                    .attr("fill",color_eu_3);
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .attr("fill",color_eu_2);
            });

        // var width = svg_country.attr("width"),
        //     height = svg_country.attr("height"),
        //     x0 = g_map.attr("x"),
        //     y0 = g_map.attr("y"),
        //     x1 = g_map.attr("width") + x0,
        //     y1 = g_map.attr("height") + y0;


        // g_map.call(
        //     d3.zoom().on("zoom", function () {
        //     var t = d3.event.transform;
        //     if (t.invertX(0) > x0) t.x = -x0 * t.k;
        //     else if (t.invertX(width) < x1) t.x = width - x1 * t.k;
        //     if (t.invertY(0) > y0) t.y = -y0 * t.k;
        //     else if (t.invertY(height) < y1) t.y = height - y1 * t.k;
        //     svg_country.attr("transform", t)
        //     translation = [
        //         Math.max(500, 500),
        //         Math.max(500, 500)
        //     ];
        //     }).scaleExtent([1, 2])
        // );



        // svg_country.append("text")
        //     .attr('x', 0)
        //     .attr('y', 20)
        //     .text(League_name)
        //     .attr('width', 50)
        //     .attr('height', 50)
        //     .attr("font-size",30)


        svg_country.append("svg:image")
            .attr('x', 50)
            .attr('y', -120)
            .attr('width', 300)
            .attr('height', 300)
            .attr("xlink:href", "images/leagues/" + country +".png")



        d3.csv("data/csv/teams.csv", function(data) {

            var data = data.filter(function(d)
            {
                if(( d["season"] === season) && (d["League_name"]===League_name))
                {
                    return d;
                }
            })
            svg_country.selectAll("myLocation")
                .data(data)
                .enter()
                .append("svg:image")
                .attr("x", function(d){ return projection_country([d.coordinates_x, d.coordinates_y])[0]-10})
                .attr("y", function(d){ return projection_country([d.coordinates_x, d.coordinates_y])[1]-10})
                .attr('width', 15)
                .attr('height', 30)
                .attr("xlink:href", "images/mark.png")
                .on("mouseover", tip_country.show, )
                .on("mouseleave", tip_country.hide)
                .style("cursor", "pointer")
                .on("click", function(d){return click_country(d);});

        })
    }
}

show_country(country, season)