var height_eu = 500
var width_eu = (window.innerWidth - 400)/2
var color_eu_1 = d3.rgb('#f5f1d8')
var color_eu_2 = d3.rgb('#8ab5b8')
var color_eu_3 = d3.rgb('#e4b69e')

var country = "Switzerland"
var season = "2011/2012"
var team = "FC Lausanne-Sports"


var svg_eu = d3.select("#layer2")
    .append("svg")
    .attr("width", width_eu)
    .attr("height", height_eu);


var projection_eu = d3.geoMercator().scale(600).center([30, 48]);
var path_eu = d3.geoPath().projection(projection_eu);

var click_eu = function(d){
    country = d.properties.name
    show_table("2008/2009", country)
    show_country(country, "2008/2009")
    show_year(country)
    show_team("2008/2009", 123, country_league.get(country))
}

d3.queue()
    .defer(d3.json, "data/new_11countries.json")
    .await(show_eu);

// update map, title and header
function show_eu(error, topo) {
    if (error) throw error;

    svg_eu.selectAll("path").remove();
    //svg.selectAll("g").remove();  // to see the legend

    // Draw the map
    var delta_x = 10
    var g_map = svg_eu.append("g")
        .attr("class", "countries")
        .attr("transform", "translate(" + delta_x + ",0)")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
        .attr('class','country')
        .attr("d", path_eu)
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
        })
        .on("click", function(d){return click_eu(d);});

    // remove the previous circle in host city
    svg_eu.selectAll("image").remove()
}
