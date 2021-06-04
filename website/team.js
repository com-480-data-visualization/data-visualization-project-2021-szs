var height_team = 500
var width_team = Math.min(1400, window.innerWidth - 400)

var margin_sports = {top: 20, right: 30, bottom: 70, left: 30},
    width_sports= Math.min(1400,window.innerWidth-400) - 300 - margin_sports.left - margin_sports.right,
    height_sports= 1500 - margin_sports.top - margin_sports.bottom;

var width_svg_bars_team = Math.min(550, (width_sports/2 + 50 ))

var svg_team = d3.select("#layer3")
    .append("svg")
    .attr("width", width_team)
    .attr("height", height_team);

function draw_radar(d) {

    let data = [{"Rating":d.rating,"Potential":d.potential,"Speed":d.speed,"Jumping":d.jumping,"Stamina":d.stamina,"Strength":d.strength}];
    let features = ["Rating","Potential","Speed","Jumping","Stamina","Strength"];
    var center_x = width_team*0.85
    var center_y = 260

    svg_team.append("svg")
        .attr("width", width_team*0.3)
        .attr("height", width_team*0.3);

    let radialScale = d3.scaleLinear()
        .domain([0,10])
        .range([0, width_team*0.15]);
    let ticks = [100,80,60,40,20];
    const radcolor = ['#8ab5b8','#9cc1c3','#b1ced0','#d4e4e5','#dde5d5'];
    const radsize = 5;

    ticks.forEach(t =>
        svg_team.append("circle")
            .attr("cx", center_x)
            .attr("cy", center_y)
            .attr("fill",radcolor[radsize-t/20])
            .attr("stroke", "#8ab5b8")
            .attr("r", radialScale(t)/25)
    );

    // ticks.forEach(t =>
    //     svg_team.append("text")
    //         .attr("x", center_x)
    //         .attr("y", center_y - radialScale(t)/25 + 5)
    //         .text(t.toString())
    //         .attr("alignment-baseline","middle")
    //         .attr("text-anchor", "middle")
    // );

    function angleToCoordinate(angle, value){
        let x = Math.cos(angle) * radialScale(value)/2.5;
        let y = Math.sin(angle) * radialScale(value)/2.5;
        return {"x": center_x + x, "y": center_y - y};
    }

    for (var i = 0; i < features.length; i++) {
        let ft_name = features[i];
        let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
        let line_coordinate = angleToCoordinate(angle, 10);
        let label_coordinate = angleToCoordinate(angle, 10.5);

        //draw axis line
        svg_team.append("line")
            .attr("x1", center_x)
            .attr("y1", center_y)
            .attr("x2", line_coordinate.x)
            .attr("y2", line_coordinate.y)
            .attr("stroke","#8ab5b8",)
            .attr("stroke-width","2px");

        //draw axis label
        // svg_team.append("text")
        //     .attr("x", label_coordinate.x)
        //     .attr("y", label_coordinate.y-5)
        //     .text(ft_name)
        //     .attr("alignment-baseline","middle")
        //     .attr("text-anchor", "middle");
    }


    let line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    let colors = ["darkorange", "gray", "navy"];

    function getPathCoordinates(data_point){
        let coordinates = [];
        for (var i = 0; i < features.length; i++){
            let ft_name = features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
            coordinates.push(angleToCoordinate(angle, data_point[ft_name]/12.5));
        }
        return coordinates;
    }

    for (var i = 0; i < data.length; i ++){
        let dd = data[i];
        let color = colors[i];
        let coordinates = getPathCoordinates(dd);

        //draw the path element
        svg_team.append("path")
            .datum(coordinates)
            .attr("d",line)
            .attr("stroke-width", 3)
            .attr("stroke", '#FFD426')
            .attr("fill", '#FFDE59')
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.7);
    }
}

function update_data(data) {
    // var translateX_bars = function(){
    //     if (width_sports < 900){
    //         return width_sports -  width_svg_bars_team;
    //     } else {
    //         return (width_sports)/2
    //     }
    // }

    var svg_bars = svg_team.append("g")
        .attr("width", 350)
        .attr("height", 400)
        .attr("transform", function(){
            return "translate(" + 500 + ", " + 20 + ")";});

    function get_data_bar(value_min, value_max, value_mean, label1, label2) {
        var value = (value_mean-value_min)*100/(value_max-value_min)
        data_bar = [ {'cumulative': 0.0, 'value': Math.round(value*10)/10, 'value_min': Math.round(value_min*10)/10 , 'value_max': Math.round(value_max*10)/10, 'value_mean': Math.round(value_mean*10)/10, 'label': label1},
            {'cumulative': value, 'value': Math.round((100.0-value) * 10) / 10, 'label': label2}];
        return data_bar;
    }
    function get_data_bar_three(value_right, value_left, value_nan, label1, label2) {
        data_bar = [ {'cumulative': 0.0, 'value': Math.round(value_right*10)/10, 'label': label1},
            {'cumulative': value_right, 'value': Math.round(value_nan*10)/10, 'label': label1},
            {'cumulative': 100-value_left, 'value': Math.round(value_left*10)/10, 'label': label2}];
        return data_bar;
    }


    function stackedBar (selection, data) {
        config = {
            f: d3.format('.1f'),
            margin: {top: 20, right: 10, bottom: 20, left: 10},
            barHeight: 30,
            colors: ['#FFDE59', '#6E5679', '#8AB5B8', '#D47C64','#C8E652']
        }
        const { f, margin, width, height, barHeight, colors } = config;
        const w = width - margin.left - margin.right;
        const h = height - margin.top - margin.bottom;
        const halfBarHeight = barHeight / 2;

        // set up scales for horizontal placement
        var widthBars = width_team * 0.18;
        var xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, widthBars]);

        var x_bias = 80
        var line_1_y = 150
        var line_2_y = 250
        selection.selectAll('rect').remove();
        selection.selectAll('text').remove();

        // stack rect for each data value
        // first bar - countries
        selection.selectAll('rect')
            .data(data[0])
            .enter().append('rect')
            .attr('class', 'rect-stacked')
            .attr('stroke', '#292729')
            .attr('stroke-width', 0.4)
            .attr('x', d => xScale(d.cumulative) - 370 - x_bias)
            .attr('y', line_1_y)
            .attr('height', barHeight)
            .attr('width', d => xScale(d.value))
            .style('fill', (d, i) => colors[i]);

        // add values on bar
        selection.selectAll('.text-value')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr("font-weight", 100)
            .attr('x', xScale(26)-400- x_bias)
            .attr('y', line_1_y + 45)
            .text("Min: "+data[0][0]['value_min'] );


        selection.selectAll('.text-value_')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr("font-weight", 100)
            .attr('x', xScale(67)-400- x_bias)
            .attr('y', line_1_y + 45)
            .text("Mean: "+data[0][0]['value_mean'] );


        selection.selectAll('.text-value__')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr("font-weight", 100)
            .attr('x', xScale(108)-400- x_bias)
            .attr('y', line_1_y + 45)
            .text("Max: "+data[0][0]['value_max']);

        // add the labels
        selection.selectAll('.text-label')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-label')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr('text-anchor', 'middle')
            .attr('x', 30 + widthBars/2-400- x_bias)
            .attr('y', line_1_y - 10)
            .style('fill', 'black')
            .text("Player Age");

        // second bar - athletes
        selection.selectAll('rect2')
            .data(data[1])
            .enter().append('rect')
            .attr('class', 'rect-stacked')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.4)
            .attr('x', d => xScale(d.cumulative) + 30 + widthBars*1.5-400- x_bias)
            .attr('y', line_1_y)
            .attr('height', barHeight)
            .attr('width', d => xScale(d.value))
            .style('fill', (d, i) => colors[i]);

        // add values on bar
        selection.selectAll('.text-value2')
            .data(data[1])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr('x', xScale(180)-400- x_bias)
            .attr('y', line_1_y + 45)
            .text("Min: "+data[1][0]['value_min']);


        selection.selectAll('.text-value2_')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr("font-weight", 100)
            .attr('x', xScale(218)-400- x_bias)
            .attr('y', line_1_y + 45)
            .text("Mean: "+data[1][0]['value_mean'] );


        selection.selectAll('.text-value2__')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr("font-weight", 100)
            .attr('x', xScale(256)-400- x_bias)
            .attr('y', line_1_y + 45)
            .text("Max: "+data[1][0]['value_max']);


        // add the labels
        selection.selectAll('.text-label2')
            .data(data[1])
            .enter().append('text')
            .attr('class', 'text-label')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr('text-anchor', 'middle')
            .attr('x',  30 + widthBars*1.5 + widthBars/2 -400- x_bias)
            .attr('y', line_1_y - 10)
            .style('fill', 'black')
            .text("Player Height");

        // third bar - male vs female
        selection.selectAll('rect3')
            .data(data[2])
            .enter().append('rect')
            .attr('class', 'rect-stacked')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.4)
            .attr('x', d => xScale(d.cumulative) -370- x_bias)
            .attr('y', line_2_y)
            .attr('height', barHeight)
            .attr('width', d => xScale(d.value))
            .style('fill', (d, i) => colors[i+2]);

        // add values on bar
        selection.selectAll('.text-value3')
            .data(data[2])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr('x', d => xScale(26)-400- x_bias)
            .attr('y', line_2_y + 45)
            .text("Min: "+data[2][0]['value_min'] );


        selection.selectAll('.text-value3_')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr("font-weight", 100)
            .attr('x', xScale(67)-400- x_bias)
            .attr('y', line_2_y + 45)
            .text("Mean: "+data[2][0]['value_mean'] );


        selection.selectAll('.text-value3__')
            .data(data[0])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr("font-weight", 100)
            .attr('x', xScale(108)-400- x_bias)
            .attr('y', line_2_y + 45)
            .text("Max: "+data[2][0]['value_max']);


        // add the labels
        selection.selectAll('.text-label3')
            .data(data[2])
            .enter().append('text')
            .attr('class', 'text-label')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr('text-anchor', 'middle')
            .attr('x', 30 + widthBars/2 -400- x_bias)
            .attr('y', line_2_y - 10)
            .style('fill', 'black')
            .text("Player Weight");

        // fourth bar - individual vs team
        selection.selectAll('rect4')
            .data(data[3])
            .enter().append('rect')
            .attr('class', 'rect-stacked')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.4)
            .attr('x', d => xScale(d.cumulative) + 30 + widthBars*1.5 -400- x_bias)
            .attr('y', line_2_y)
            .attr('height', barHeight)
            .attr('width', d => xScale(d.value))
            .style('fill', (d, i) => colors[i+2]);


        // add values on bar
        selection.selectAll('.text-value4')
            .data(data[3])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr('x', d => xScale(180)-400- x_bias)
            .attr('y', line_2_y + 45)
            .text("Right: "+data[3][0]['value']+"%");

        selection.selectAll('.text-value4_')
            .data(data[3])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr('x', d => xScale(218)-400- x_bias)
            .attr('y', line_2_y + 45)
            .text("Both: "+data[3][1]['value']+"%");

        selection.selectAll('.text-value4__')
            .data(data[3])
            .enter().append('text')
            .attr('class', 'text-value')
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "12px")
            .attr('x', d => xScale(256)-400- x_bias)
            .attr('y', line_2_y + 45)
            .text("Left: "+data[3][2]['value']+"%");


        // add the labels
        selection.selectAll('.text-label4')
            .data(data[3])
            .enter().append('text')
            .attr('class', 'text-label')
            .attr('text-anchor', 'middle')
            .attr("font-family", "Oswald")
            .attr("font-size", "15px")
            .attr('text-anchor', 'middle')
            .attr('x', 30 + widthBars*1.5 + widthBars/2-400- x_bias)
            .attr('y', line_2_y - 10)
            .style('fill', 'black')
            .text("Left foot vs Right foot");

    }


    let data_age = get_data_bar(data.age_min, data.age_max, data.age_mean, 'Countries participating', 'Total');
    let data_height = get_data_bar(data.height_min, data.height_max, data.height_mean,'Athletes participating', 'Total');
    let data_weight = get_data_bar(data.weight_min, data.weight_max, data.weight_mean, 'Men', 'Women');
    let data_foot = get_data_bar_three(data.right_foot, data.left_foot, 100-data.right_foot-data.left_foot, 'Individual events', 'Team events');

    let all_data = [data_age, data_height, data_weight, data_foot];

    stackedBar(svg_bars, all_data);
}

function show_team(season, team, League) {
    svg_team.selectAll("*").remove();
    d3.csv("data/csv/team_players.csv", function(data) {


        var data = data.filter(function(d)
        {
            if(( d["season"] == season) && (d["team_long_name"]==team))
            {
                svg_team.append("svg:image")
                    .attr("x", width_team*0.55)
                    .attr("y", 50)
                    .attr('width', width_team*0.45)
                    .attr('height', 400)
                    .attr("xlink:href", "images/background_layer3.svg")
                update_data(d)
                draw_radar(d)
                return d;
            }
            else if(( d["season"] == season) && (d["League_name"]==League) && (d["rank"]==1))
            {
                svg_team.append("svg:image")
                    .attr("x", width_team*0.55)
                    .attr("y", 50)
                    .attr('width', width_team*0.45)
                    .attr('height', 400)
                    .attr("xlink:href", "images/background_layer3.svg")
                update_data(d)
                draw_radar(d)
                return d;
            }
        })



        svg_team.append("text")
            .data(data)
            .attr("x", width_team*0.5)
            .attr("y", 30)
            .text(function(d){ return ( "season-" + season + ">>" + d.team_long_name); })
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "30px")
            .attr("font-weight", 400)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");

        svg_team.append("svg:image")
            .data(data)
            .attr("x", width_team*0.1)
            .attr("y", 0)
            .attr('width', 80)
            .attr('height', 80)
            .attr("xlink:href", function(d){return "images/team/"+ d.team_idx +".png";})

        // svg_team.append("text")
        //     .attr("x", width_svg_bars_team/2-5)
        //     .attr("y", 80)
        //     .text('Top Player')
        //     .style("text-anchor", "middle")
        //     .attr("font-family", "Oswald")
        //     .attr("font-size", "20px")
        //     .attr("font-weight", 400)
        //     .attr("alignment-baseline","middle")
        //     .attr("text-anchor", "middle");

        svg_team.append("svg:image")
            .data(data)
            .attr("x", width_team*0.64-50)
            .attr("y", 200)
            .attr('width', 100)
            .attr('height', 100)
            .attr("xlink:href", function(d){return "images/player/"+ d.player_idx +".jpg" ;})
            .attr("alignment-baseline","middle")

        svg_team.append("text")
            .attr("x", width_team*0.64)
            .attr("y", 340)
            .data(data)
            .text(function(d){ return (d.best_player_name); })
            .style("text-anchor", "middle")
            .attr("font-family", "Oswald")
            .attr("font-size", "20px")
            .attr("font-weight", 400)
            .attr("alignment-baseline","middle")
            .attr("text-anchor", "middle");
    })

}

show_team(season, team, "-")