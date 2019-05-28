/* global angular */

    angular
        .module("ProjectApp")
        .controller("ClimateViewCtrl",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("View Controller initialized.");
            var API = "/api/v2/climate-stats";
            var data;
            
        $http({
            url : API,
            method : "GET",
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                data = response.data;
                
                // ----------------- HighCharts
                
                var mdata = data.map(function(item){
                    return item.methane_stats;
                });
                
                var cdata = data.map(function(item){
                    return item.co2_stats;
                });
                
                var ndata = data.map(function(item){
                    return item.nitrous_oxide_stats;
                });
                
                var categoriesData = data.map(function(item){
                    return (item.country + " " + item.year);
                });
                
                Highcharts.chart('highchart', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Emisión de gases de efecto invernadero'
                        },
                        xAxis: {
                            categories: categoriesData
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total c02 en kt'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                }
                            }
                        },
                        legend: {
                            align: 'right',
                            x: -30,
                            verticalAlign: 'top',
                            y: 25,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                                }
                            }
                        },
                        series: [{
                            name: 'C02 (kt)',
                            data: cdata
                        }, {
                            name: 'Metano (kt de co2 equivalente)',
                            data: mdata
                        }, {
                            name: 'Oxido nitroso (kt de co2 equivalente)',
                            data: ndata
                        }]
                    });
                    
                // ----------------- GeoCharts
            
                var googleData = [];
                
                googleData[0] = ['Country', 'CO2 Emission (kt)'];
                googleData[1] = [' ', 0];
                var j = 2;
                for (var i = 0; i < data.length; i++) {
                        if(data[i].year == 2012)
                            googleData[j++] = [data[i].country, data[i].co2_stats];
                }
                
                google.charts.load('current', {
                    'packages':['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);
                    
                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable(googleData);
                    
                    var options = {
                        colorAxis: {colors: ['#00853f', 'orange', '#e31b23']},

                        };
                    
                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
                    
                    chart.draw(data, options);
                }
                
                // ----------------- D3
                
                /*var width = 600;
         
                var height = 600;
                 
                var data = cdata;
                 
                var colors = ['green'];
                 
                var svg = d3
                    .select("#chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
                 
                var g = svg.selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("transform", function(d, i) {
                       return "translate(0,0)";
                    });
                 
                g.append("circle").attr("cx", function(d, i) {
                    return i*75 + 50;
                })
                 
                .attr("cy", function(d, i) {
                    return 75;
                })
          
                .attr("r", function(d) {
                    return d*1.5;
                })
                 
                .attr("fill", function(d, i){
                    return colors[i];
                });
                 
                g.append("text").attr("x", function(d, i) {
                    return i * 75 + 25;
                })
                 
                .attr("y", 80)
                .attr("stroke", "teal")
                .attr("font-size", "10px")
                .attr("font-family", "sans-serif").text(function(d) {
                    return d;
                });*/
                
                var d3Data = [];
                
                for (var i = 0; i < data.length; i++) {
                    d3Data[i] = {co2 : data[i].co2_stats, 
                                 countryear : data[i].country + " " + data[i].year};
                }
                
                const margin = 60;
                const width = 1000 - 2 * margin;
                const height = 600 - 2 * margin;
                
                var svg = d3
                    .select("#chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
                
                var chart = svg.append('g')
                    .attr('transform', `translate(${margin}, ${margin})`);
                    
                const yScale = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, Math.max( ...cdata)]);
                    
                chart.append('g')
                    .call(d3.axisLeft(yScale));
                    
                const xScale = d3.scaleBand()
                    .range([0, width])
                    .domain(d3Data.map((s)=>d3Data.countryear))
                    .padding(0.2)
                
                
                
                
            /*
                // vertical grid lines
                // const makeXLines = () => d3.axisBottom()
                //   .scale(xScale)
            
                const makeYLines = () => d3.axisLeft()
                  .scale(yScale)
            
                chart.append('g')
                  .attr('transform', `translate(0, ${height})`)
                  .call(d3.axisBottom(xScale));
            
                chart.append('g')
                  .call(d3.axisLeft(yScale));
            
                // vertical grid lines
                // chart.append('g')
                //   .attr('class', 'grid')
                //   .attr('transform', `translate(0, ${height})`)
                //   .call(makeXLines()
                //     .tickSize(-height, 0, 0)
                //     .tickFormat('')
                //   )
            
                chart.append('g')
                  .attr('class', 'grid')
                  .call(makeYLines()
                    .tickSize(-width, 0, 0)
                    .tickFormat('')
                  )
            
                const barGroups = chart.selectAll()
                  .data(sample)
                  .enter()
                  .append('g')
            
                barGroups
                  .append('rect')
                  .attr('class', 'bar')
                  .attr('x', (g) => xScale(g.language))
                  .attr('y', (g) => yScale(g.value))
                  .attr('height', (g) => height - yScale(g.value))
                  .attr('width', xScale.bandwidth())
                  .on('mouseenter', function (actual, i) {
                    d3.selectAll('.value')
                      .attr('opacity', 0)
            
                    d3.select(this)
                      .transition()
                      .duration(300)
                      .attr('opacity', 0.6)
                      .attr('x', (a) => xScale(a.language) - 5)
                      .attr('width', xScale.bandwidth() + 10)
            
                    const y = yScale(actual.value)
            
                    line = chart.append('line')
                      .attr('id', 'limit')
                      .attr('x1', 0)
                      .attr('y1', y)
                      .attr('x2', width)
                      .attr('y2', y)
            
                    barGroups.append('text')
                      .attr('class', 'divergence')
                      .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
                      .attr('y', (a) => yScale(a.value) + 30)
                      .attr('fill', 'white')
                      .attr('text-anchor', 'middle')
                      .text((a, idx) => {
                        const divergence = (a.value - actual.value).toFixed(1)
                        
                        let text = ''
                        if (divergence > 0) text += '+'
                        text += `${divergence}%`
            
                        return idx !== i ? text : '';
                      })
            
                  })
                  .on('mouseleave', function () {
                    d3.selectAll('.value')
                      .attr('opacity', 1)
            
                    d3.select(this)
                      .transition()
                      .duration(300)
                      .attr('opacity', 1)
                      .attr('x', (a) => xScale(a.language))
                      .attr('width', xScale.bandwidth())
            
                    chart.selectAll('#limit').remove()
                    chart.selectAll('.divergence').remove()
                  })
            
                barGroups 
                  .append('text')
                  .attr('class', 'value')
                  .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
                  .attr('y', (a) => yScale(a.value) + 30)
                  .attr('text-anchor', 'middle')
                  .text((a) => `${a.value}%`)
                
                svg
                  .append('text')
                  .attr('class', 'label')
                  .attr('x', -(height / 2) - margin)
                  .attr('y', margin / 2.4)
                  .attr('transform', 'rotate(-90)')
                  .attr('text-anchor', 'middle')
                  .text('Love meter (%)')
            
                svg.append('text')
                  .attr('class', 'label')
                  .attr('x', width / 2 + margin)
                  .attr('y', height + margin * 1.7)
                  .attr('text-anchor', 'middle')
                  .text('Languages')
            
                svg.append('text')
                  .attr('class', 'title')
                  .attr('x', width / 2 + margin)
                  .attr('y', 40)
                  .attr('text-anchor', 'middle')
                  .text('Most loved programming languages in 2018')
            
                svg.append('text')
                  .attr('class', 'source')
                  .attr('x', width - margin / 2)
                  .attr('y', height + margin * 1.7)
                  .attr('text-anchor', 'start')
                  .text('Source: Stack Overflow, 2018')*/
              
                        
            });
        }]);    