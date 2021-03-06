angular.module("chart", ["chart.js"]).controller("chartController", function($scope) {
    iniciar();

    /**
     * @ngdoc controller
     * @name iniciar
     * @module apl-web-crh.reestruturacao-campanha
     * @description Função de inicialização do controller
     */
    function iniciar() {
        // drawAngularChart();
        drawCanvasChart();
        // drawChartJS();
    }

    $scope.changeData = function() {
        $scope.myChart.data.datasets[0]._meta[0].controller.chart.options.scales.xAxes[0].time.max = new Date("2020-11-30");
        // $scope.myChart.data.labels = [new Date("2019-01-01"), new Date("2020-11-30")];
        // $scope.myChart.update();
        $scope.myChart.update();
        // drawCanvasChart();
    }

    function drawAngularChart() {
        $scope.labels = [new Date("2019-01-01"), new Date("2019-12-30")];
        // $scope.series = ['Series A', 'Series B'];
        var data = [
            { x: "09/01/2019", y: 0, z: 'XPTO', a: 'Domicílio' },
            { x: "10/01/2019", y: 175, z: 'XPTO', a: 'Domicílio' },
            { x: "11/01/2019", y: 178, z: 'XPTO', a: 'Domicílio' },
            { x: "13/01/2019", y: 178, z: 'XPTO', a: 'Domicílio' },
            { x: "14/01/2019", y: 179, z: 'XPTO', a: 'Domicílio' },
            { x: "15/01/2019", y: 180, z: 'XPTO', a: 'Domicílio' },
            { x: "16/01/2019", y: 181, z: 'XPTO', a: 'Domicílio' },
            { x: "17/01/2019", y: 182, z: 'XPTO', a: 'Domicílio' },
            { x: "18/01/2019", y: 183, z: 'XPTO', a: 'Domicílio' },
            { x: "18/02/2019", y: 183, z: 'XPTO', a: 'Domicílio' },
        ];
        $scope.data = [data];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [
            {
                label: 'MDR Negociado ',
                backgroundColor: [
                    'rgba(89, 137, 213, 0.7)',
                    'rgba(89, 137, 213, 0.7)',
                    'rgba(89, 137, 213, 0.7)',
                    'rgba(89, 137, 213, 0.7)',
                    'rgba(89, 190, 93, 0.7)',
                    'rgba(89, 190, 93, 0.7)',
                    'rgba(89, 190, 93, 0.7)',
                    'rgba(89, 190, 93, 0.7)',
                    'rgba(89, 190, 93, 0.7)',
                    'rgba(89, 190, 93, 0.7)',
                ],
                borderColor: 'rgba(89, 137, 213, 0.7)',
                // spanGaps: false,
                borderWidth: 1,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointHoverBorderColor: 'rgba(89, 137, 213, 1)',
                // steppedLine: true
                // yAxisID: 'first-y-axis'
            },
        ];
        $scope.options = {
            tooltips: {
                enabled: false,
                // enabled: false,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var dados = data['datasets'][tooltipItem['datasetIndex']]['data'][tooltipItem['index']];
                        var dadosRetornados = "";
                        if (dados) {
                            dadosRetornados = "Data: " + dados.x + "<br>";
                            dadosRetornados += "Valor: " + dados.y + "<br>";
                            dadosRetornados += "MDR: " + dados.z + "<br>";
                            dadosRetornados += "Campanha: " + dados.a;
                        }
                        return dadosRetornados;
                    },
                },
                // backgroundColor: '#FFF',
                // titleFontSize: 16,
                // titleFontColor: '#0066ff',
                // bodyFontColor: '#000',
                // bodyFontSize: 14,
                // displayColors: false,
                custom: function(tooltipModel) {
                    // Tooltip Element
                    var tooltipEl = document.getElementById('chartjs-tooltip');

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        var divStyle = 'transform: translateY(-120%) translateX(-50%); min-width: 140px; height: 65px; background-color: white; border-radius: 2px; box-shadow: 0.5px 0.5px 1px 1px #dcdbdb;';
                        tooltipEl.setAttribute("style", divStyle);
                        tooltipEl.innerHTML = '<table style="font-size: 10px; font-family: Arial; color: rgba(136, 136, 136, 1);"></table>';
                        document.body.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Set caret Position
                    // tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        // tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        // tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                    // Set Text
                    if (tooltipModel.body) {
                        console.log("Teste ", tooltipModel)
                        console.log("xLabel", tooltipModel.dataPoints[0].xLabel)
                        console.log("yLabel", tooltipModel.dataPoints[0].yLabel)
                        var titleLines = tooltipModel.title || [];
                        // var bodyLines = tooltipModel.body.map(getBody);

                        var innerHtml = '<thead>';

                        // titleLines.forEach(function(title) {
                        //     innerHtml += '<tr><th>' + title + '</th></tr>';
                        // });
                        innerHtml += '</thead><tbody>';
                        console.log("bodyLines", bodyLines)
                        bodyLines.forEach(function(body, i) {
                            // if (i == 0) {   //valida apenas o primeiro indíce dos valores presente do body
                                var colors = tooltipModel.labelColors[i];
                                var style = 'background:' + colors.backgroundColor;
                                style += '; border-color:' + colors.borderColor;
                                style += '; border-width: 2px';
                                var span = '<span style="' + style + '"></span>';
                                innerHtml += '<tr><td>' + span + body + '</td></tr>';
                            // }
                        });
                        innerHtml += '</tbody>';

                        var tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }

                    // `this` will be the overall tooltip
                    var position = this._chart.canvas.getBoundingClientRect();

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                    tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                }
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                }
            },
            legend: {
                display: true,
                position: 'bottom',
                // boxWidth: 100,
                labels: {
                    fontColor: 'rgba(154, 154, 154, 1)',
                    // generateLabels: function(chart) {
                        // var data = chart.data;
                        // if (data.labels.length && data.datasets.length) {
                        //     return data.labels.map(function(label, i) {
                        //         var meta = chart.getDatasetMeta(0);
                        //         console.log(meta.controller)
                        //         var style = meta.controller.getStyle(i);

                        //         return {
                        //             text: label,
                        //             fillStyle: style.backgroundColor,
                        //             strokeStyle: style.borderColor,
                        //             lineWidth: style.borderWidth,
                        //             hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,

                        //             // Extra data used for toggling the correct item
                        //             index: i
                        //         };
                        //     });
                        // }
                        // return [];
                        // return {
                        //     // Label that will be displayed
                        //     text: chart.data.labels,
                        //     // Fill style of the legend box
                        //     fillStyle: "red",
                        //     // If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect
                        //     hidden: false,
                        //     // For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap
                        //     lineCap: "butt",
                        //     // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
                        //     lineDash: [10],
                        //     // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
                        //     lineDashOffset: 0,
                        //     // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
                        //     lineJoin: "bevel",
                        //     // Width of box border
                        //     lineWidth: 100,
                        //     // Stroke style of the legend box
                        //     strokeStyle: "red",
                        //     // Point style of the legend box (only used if usePointStyle is true)
                        //     // pointStyle: string
                        // }
                    // }
                },
            },
            legendCallback: function(chart) {
                var text = [];
                text.push('<ul class="' + chart.id + '-legend">');

                var data = chart.data;
                var datasets = data.datasets;
                var labels = data.labels;

                if (datasets.length) {
                    for (var i = 0; i < datasets[0].data.length; ++i) {
                        text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
                        if (labels[i]) {
                            text.push(labels[i]);
                        }
                        text.push('</li>');
                    }
                }

                text.push('</ul>');
                console.log(text)
                return text.join('');
            },
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                },
                // point: {
                //     radius: 0,
                //     hoverRadius: 5,
                // }
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    bounds: 'ticks',
                    time: {
                        parser: 'DD/MM/YYYY',
                        unit: 'month',
                        min: new Date("2019-01-01"),
                        max: new Date("2019-12-30"),
                        stepSize: 1
                    },
                    gridLines: {
                        // display: false,
                        color: 'rgba(190, 190, 190, 1)',
                        lineWidth: 2,
                        drawBorder: false,
                    },
                    position: 'top',
                    ticks: {
                        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        // bounds: 'ticks'
                        padding: 5,
                        // max: 0,
                        // min: 300,
                        beginAtZero: true,
                        
                        // stepSize: 0.5,
                        // autoSkip: false,
                        // autoSkipPadding: 5,
                        // source: 'labels'
                    },
                    // borderDash: [10, 10],
                    // borderDashOffset: 1.0,
                    // drawBorder: true,
                    // offsetGridLines: true
                    stacked: true,
                }],
                yAxes: [{
                    gridLines: {
                        borderDash: [5],
                        drawTicks: false,
                    },
                    ticks: {
                        min: 0,
                        max: 300,
                        beginAtZero: true,
                        fontColor: 'rgba(203, 203, 203, 1)',
                        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        padding: 5,
                        // Inclui um valor de milhar em (k) no final do número
                        callback: function(value, index, values) {
                            if (value != 0) {
                                return value + "k";
                            } else {
                                // Ignorando a mostra do número 0
                                return "";
                            }
                        },
                    },
                    stacked: true
                }]
            },
        };
        // tem que ver se plugins são aceitos no angular-chart
        // plugins: [{
        //     beforeRender: function (x, options) {
        //         console.log("kfkdsjfk djskjds kfdsf", x.config.data.datasets[0]._meta[0].dataset._children)
        //         // var c = x.chart
        //         var dataset = x.data.datasets[0];
        //         var model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;                        
        //         // var yScale = x.scales['y-axis-0'];
        //         // var yPos = yScale.getPixelForValue(0);
        //         // var minX = 74.22306305162047;   //36.021484375
        //         // var maxX = 493.1432743418808;
        //         // var gradientFill = c.ctx.createLinearGradient(minX, 0, maxX, 0);
        //         // gradientFill.addColorStop(0.1, 'yellow');
        //         // gradientFill.addColorStop(0.0, 'green');
        //         // gradientFill.addColorStop(0.2, 'gray');
        //         // gradientFill.addColorStop(0.3, 'red');
        //         // gradientFill.addColorStop(0.4, 'yellow');
        //         // gradientFill.addColorStop(0.5, 'green');
        //         // gradientFill.addColorStop(0.6, 'green');
        //         // gradientFill.addColorStop(0.7, 'green');
        //         // // gradientFill.addColorStop(yPos / c.height - 0.10, 'green');
        //         // // gradientFill.addColorStop(yPos / c.height + 0.01, 'red');
        //         // // gradientFill.addColorStop(1, 'red');

        //         var obj = x.config.data.datasets[0]._meta[0].dataset;
        //         var view = obj._view;
        //         var backgroundColors = obj._chart.controller.data.datasets[obj._datasetIndex].backgroundColor;
        //         var points = obj._children;
        //         var ctx = obj._chart.ctx;
        //         var minX = points[0]._model.x;
        //         var maxX = points[points.length - 1]._model.x;
        //         // minX = 74.22306305162047;   //36.021484375
        //         maxX = 493.1432743418808;
        //         var linearGradient = ctx.createLinearGradient(minX, 0, maxX, 0);

        //         points.forEach(function(point, i) { // start original code
        //             // `addColorStop` expects a number between 0 and 1, so we
        //             // have to normalize the x position of each point between 0 and 1
        //             // and round to make sure the positioning isn't too percise 
        //             // (otherwise it won't line up with the point position)
        //             var colorStopPosition = roundNumber((point._model.x - minX) / (maxX - minX), 2);
        //             // special case for the first color stop
        //             if (i === 0) {
        //                 linearGradient.addColorStop(0, backgroundColors[i]);
        //             } else {
        //                 // only add a color stop if the color is different
        //                 if ( backgroundColors[i] !== backgroundColors[i-1]) {
        //                 // add a color stop for the prev color and for the new color at the same location
        //                 // this gives a solid color gradient instead of a gradient that fades to the next color
        //                 linearGradient.addColorStop(colorStopPosition, backgroundColors[i - 1]);
        //                 linearGradient.addColorStop(colorStopPosition, backgroundColors[i]);
        //                 }
        //             }
        //         });

        //         model.backgroundColor = linearGradient;
        //     }
        // }];
    }

    function drawCanvasChart() {
        // testando draw
        // var originalController = Chart.controllers.line;
        // Chart.controllers.line = Chart.controllers.line.extend({
        // draw: function() {
        //     originalController.prototype.draw.call(this, arguments);
        //     drawLabels(this);
        // }
        // });

        // function drawLabels(t) {
        //     ctx.save();
        //     ctx.font = Chart.helpers.fontString(12, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        //     ctx.fillStyle = 'red';
        //     ctx.textBaseline = 'bottom';

        //     var chartInstance = t.chart;
        //     var datasets = chartInstance.config.data.datasets;
        //     datasets.forEach(function(ds, index) {
        //         var text = document.createElement("div");
        //         var label = text;
        //         var meta = chartInstance.controller.getDatasetMeta(index);
        //         console.log("meta ", meta)
        //         var len = meta.data.length-1;
        //         len = 4;
        //         //console.log(ds, meta.data[len]._model);    
        //         var xOffset = meta.data[len]._model.x;
        //         console.log(meta.data[len]._model)
        //         var yOffset = meta.data[len]._model.y;
        //         console.log(ctx)
        //         console.log(xOffset)
        //         ctx.rect(0, 0, 150, 100);
        //         ctx.fill();
        //         ctx.fillText(label, xOffset, yOffset, 130);
        //     });
        //     ctx.restore();
        // }
        // testando draw
        var originalController = Chart.controllers.line;
        Chart.controllers.line = Chart.controllers.line.extend({
            draw: function(ease) {
                originalController.prototype.draw.call(this, ease);
         
                if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                    var activePoint = this.chart.tooltip._active[0];
                    var ctx = this.chart.ctx;
                    var x = activePoint.tooltipPosition().x;
                    var topY = this.chart.scales['y-axis-0'].top;
                    console.log("topY ", x)
                    var bottomY = this.chart.scales['y-axis-0'].bottom;
         
                    // draw line
                    ctx.save();
                    ctx.beginPath();
                    ctx.setLineDash([5, 5]);
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#07C';
                    ctx.stroke();
                    ctx.restore();
                }
            }
        });
        // testando draw - FIM

        var ctx = document.getElementById('myChart').getContext('2d');
        var ctxOptions = {
            type: 'line',
            data: {
                labels: [new Date("2019-01-01"), new Date("2019-11-30")],
                datasets: [{
                    label: 'MDR Negociado',
                    data: [
                        { x: "09/01/2018", y: 200, z: 'XPTO', a: 'Domicílio' },
                        { x: "10/01/2018", y: 300, z: 'XPTO', a: 'Domicílio' },
                        { x: "09/01/2018", y: NaN, z: 'XPTO', a: 'Domicílio' },
                        { x: "09/01/2019", y: 0, z: 'XPTO', a: 'Domicílio' },
                        { x: "10/01/2019", y: 175, z: 'XPTO', a: 'Domicílio' },
                        { x: "11/01/2019", y: 178, z: 'XPTO', a: 'Domicílio' },
                        { x: "13/01/2019", y: 178, z: 'XPTO', a: 'Domicílio' },
                        { x: "14/01/2019", y: 179, z: 'XPTO', a: 'Domicílio' },
                        { x: "15/01/2019", y: 180, z: 'XPTO', a: 'Domicílio' },
                        { x: "16/01/2019", y: 181, z: 'XPTO', a: 'Domicílio' },
                        { x: "17/01/2019", y: 182, z: 'XPTO', a: 'Domicílio' },
                        { x: "18/01/2019", y: 183, z: 'XPTO', a: 'Domicílio' },
                        { x: "18/02/2019", y: 183, z: 'XPTO', a: 'Domicílio' },
                        { x: "18/02/2019", y: NaN, z: 'XPTO', a: 'Domicílio' },
                        { x: "18/03/2019", y: 175, z: 'XPTO', a: 'Domicílio' },
                        { x: "18/04/2019", y: 175, z: 'XPTO', a: 'Domicílio' },
                    ],
                    backgroundColor: [
                        'rgba(89, 190, 93, 0.6)',
                        'rgba(89, 190, 93, 0.6)',
                        'rgba(89, 137, 213, 0.6)',                    
                        'rgba(89, 137, 213, 0.6)',
                        'rgba(89, 137, 213, 0.6)',
                        'rgba(89, 137, 213, 0.6)',
                        'rgba(89, 137, 213, 0.6)',
                        'rgba(89, 137, 213, 0.6)',
                        'rgba(89, 190, 93, 0.6)',
                        'rgba(89, 190, 93, 0.6)',
                        'rgba(89, 190, 93, 0.6)',
                        'rgba(89, 190, 93, 0.6)',
                        'rgba(89, 190, 93, 0.6)',
                        'rgba(89, 190, 93, 0.6)',                        
                        'rgba(89, 137, 213, 0.6)',
                        'rgba(89, 137, 213, 0.6)',
                    ],
                    spanGaps: false,
                    borderWidth: 1,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
                    pointHoverBorderColor: 'rgba(89, 137, 213, 1)',
                }],
            },
            options: {
                tooltips: {
                    enabled: false,
                    mode: "label",
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var dados = data['datasets'][tooltipItem['datasetIndex']]['data'][tooltipItem['index']];
                            var dadosRetornados = "";
                            if (dados) {
                                dadosRetornados = "Data: " + dados.x + "<br>";
                                dadosRetornados += "Valor: " + dados.y + "<br>";
                                dadosRetornados += "MDR: " + dados.z + "<br>";
                                dadosRetornados += "Campanha: " + dados.a;
                            }
                            return dadosRetornados;
                        },
                    },
                    custom: function(tooltipModel) {
                        // Tooltip Element
                        var tooltipEl = document.getElementById('chartjs-tooltip');

                        // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            var divStyle = 'transform: translateY(-120%) translateX(-50%); min-width: 140px; height: 65px; background-color: white; border-radius: 2px; box-shadow: 0.5px 0.5px 1px 1px #dcdbdb;';
                            tooltipEl.setAttribute("style", divStyle);
                            tooltipEl.innerHTML = '<table style="font-size: 10px; font-family: Arial; color: rgba(136, 136, 136, 1);"></table>';
                            document.body.appendChild(tooltipEl);
                        }

                        // Hide if no tooltip
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }

                        // Set caret Position
                        // tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            // tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            // tooltipEl.classList.add('no-transform');
                        }

                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        }

                        // Set Text
                        if (tooltipModel.body) {
                            
                            var titleLines = tooltipModel.title || [];
                            var bodyLines = tooltipModel.body.map(getBody);

                            var innerHtml = '<thead>';

                            // titleLines.forEach(function(title) {
                            //     innerHtml += '<tr><th>' + title + '</th></tr>';
                            // });
                            innerHtml += '</thead><tbody>';
                            bodyLines.forEach(function(body, i) {
                                // if (i == 0) {   //valida apenas o primeiro indíce dos valores presente do body
                                    var colors = tooltipModel.labelColors[i];
                                    var style = 'background: red' + colors.backgroundColor;
                                    style += '; border-color:' + colors.borderColor;
                                    style += '; border-width: 2px';
                                    var span = '<span style="' + style + '"></span>';
                                    innerHtml += '<tr><td>' + span + body + '</td></tr>';
                                // }
                            });
                            innerHtml += '</tbody>';

                            var tableRoot = tooltipEl.querySelector('table');
                            tableRoot.innerHTML = innerHtml;
                        }

                        // `this` will be the overall tooltip
                        var position = this._chart.canvas.getBoundingClientRect();

                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }
                },
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                    }
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    // boxWidth: 100,
                    labels: {
                        fontColor: 'rgba(154, 154, 154, 1)',
                    },
                },
                legendCallback: function(chart) {
                    var text = [];
                    // text.push('<ul class="' + chart.id + '-legend">');

                    // var data = chart.data;
                    // var datasets = data.datasets;
                    // var labels = data.labels;
                    
                    // if (datasets.length) {
                    //     for (var i = 0; i < datasets[0].data.length; ++i) {
                    //         text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
                    //         if (labels[i]) {
                    //             text.push(labels[i]);
                    //         }
                    //         text.push('</li>');
                    //     }
                    // }

                    // text.push('</ul>');
                    console.log(" teasf ", chart)
                    var divStyle = "margin-left: 1px; background-color: gray; width: 50px; text-align: center";
                    text.push("<div style='display: flex;'>");
                    text.push("<label>Períodos</label>");
                    text.push("<div style='" + divStyle + "'>1</div>");
                    text.push("<div style='" + divStyle + "'>2</div>");
                    text.push("</div>");
                    return text.join("");
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    },
                    // point: {
                    //     radius: 0,
                    //     hoverRadius: 5,
                    // }
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        bounds: 'ticks',
                        time: {
                            parser: 'DD/MM/YYYY',
                            unit: 'month',
                            min: new Date("2019-01-01"),
                            max: new Date("2019-12-30"),
                            stepSize: 1
                        },
                        gridLines: {
                            // display: false,
                            color: 'rgba(190, 190, 190, 1)',
                            lineWidth: 2,
                            drawBorder: false,
                        },
                        position: 'top',
                        ticks: {
                            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                            // bounds: 'ticks'
                            padding: 5,
                            // max: 0,
                            // min: 300,
                            beginAtZero: true,
                            
                            // stepSize: 0.5,
                            // autoSkip: false,
                            // autoSkipPadding: 5,
                            // source: 'labels'
                        },
                        // borderDash: [10, 10],
                        // borderDashOffset: 1.0,
                        // drawBorder: true,
                        // offsetGridLines: true
                        stacked: true,
                    }],
                    yAxes: [{
                        gridLines: {
                            borderDash: [5],
                            drawTicks: false,
                        },
                        ticks: {
                            min: 0,
                            max: 300,
                            beginAtZero: true,
                            fontColor: 'rgba(203, 203, 203, 1)',
                            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                            padding: 5,
                            // Inclui um valor de milhar em (k) no final do número
                            callback: function(value, index, values) {
                                if (value != 0) {
                                    return value + "k";
                                } else {
                                    // Ignorando a mostra do número 0
                                    return "";
                                }
                            },
                        },
                        stacked: true
                    }]
                },
            },
            plugins: [{
                beforeRender: function (x, options) {  //tem que ver se tem como chamar apenas uma vez
                    var dataset = x.data.datasets[0];
                    var model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
                    console.log("teste ", x.config.data.datasets[0])
                    var obj = null;
                    if (!x.config.data.datasets[0]._meta[0]) {
                        obj = x.config.data.datasets[0]._meta[1].dataset;
                    } else {
                        obj = x.config.data.datasets[0]._meta[0].dataset;
                    }
                    var view = obj._view;
                    var backgroundColors = obj._chart.controller.data.datasets[obj._datasetIndex].backgroundColor;
                    var points = obj._children;
                    var ctx = obj._chart.ctx;
                    var minX = points[0]._view.x;
                    var maxX = points[points.length - 1]._view.x;
                    // minX = 74.22306305162047;   //36.021484375
                    // maxX = 493.1432743418808;
                    var linearGradient = ctx.createLinearGradient(minX, 0, maxX, 0);
                    points.forEach(function(point, i) { // start original code
                        // `addColorStop` expects a number between 0 and 1, so we
                        // have to normalize the x position of each point between 0 and 1
                        // and round to make sure the positioning isn't too percise 
                        // (otherwise it won't line up with the point position)
                        var roundNumber = function (num, scale) {
                            var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
                            if(num - number > 0) {
                                return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
                            } else {
                                return number;
                            }
                        };
                        var colorStopPosition = roundNumber((point._view.x - minX) / (maxX - minX), 2);
                        // special case for the first color stop
                        if (i === 0) {
                            linearGradient.addColorStop(0, backgroundColors[i]);
                        } else {
                            // only add a color stop if the color is different
                            if ( backgroundColors[i] !== backgroundColors[i-1]) {
                            // add a color stop for the prev color and for the new color at the same location
                            // this gives a solid color gradient instead of a gradient that fades to the next color
                            linearGradient.addColorStop(colorStopPosition, backgroundColors[i - 1]);
                            linearGradient.addColorStop(colorStopPosition, backgroundColors[i]);
                            }
                        }
                    });
                    model.backgroundColor = linearGradient;
                }
            }]
        }
        $scope.myChart = new Chart(ctx, ctxOptions);
        var legend = $scope.myChart.generateLegend();
        document.getElementById('myLegend').insertAdjacentHTML('beforeend', legend);
        // var ctxz = canvas.getContext('2d');
    }

    // função de teste dos gráficos
    // function drawChartJS() {
    //     var chartColors = {
    //         red: 'rgba(255, 99, 132)',
    //         orange: 'rgba(255, 159, 64)',
    //         yellow: 'rgba(255, 205, 86)',
    //         green: 'rgba(75, 192, 192)',
    //         blue: 'rgba(54, 162, 235)',
    //         purple: 'rgba(153, 102, 255)',
    //         grey: 'rgba(231,233,237)'
    //     };

    //     // used to generate random data point values
    //     var randomScalingFactor = function() {
    //         return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
    //     };

    //     // decimal rounding algorithm
    //     // see: https://plnkr.co/edit/uau8BlS1cqbvWPCHJeOy?p=preview
    //     var roundNumber = function (num, scale) {
    //         var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
    //         if(num - number > 0) {
    //             return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
    //         } else {
    //             return number;
    //         }
    //     };

    //     var labels = [new Date("2019-01-02"), new Date("2019-12-30")];
    //     // var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //     // var lineData = [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()];
    //     var lineData = [
    //         {x: "01/02/2019", y: randomScalingFactor(), a: true},
    //         {x: "04/02/2019", y: randomScalingFactor(), a: true},
    //         {x: "07/02/2019", y: randomScalingFactor(), a: true},
    //         {x: "10/02/2019", y: randomScalingFactor()},
    //         {x: "12/02/2019", y: randomScalingFactor()},
    //         {x: "14/02/2019", y: randomScalingFactor()},
    //         {x: "16/02/2019", y: randomScalingFactor()},
    //         {x: "20/02/2019", y: randomScalingFactor()},
    //         {x: "23/02/2019", y: randomScalingFactor()},
    //         {x: "25/02/2019", y: randomScalingFactor()},
    //         {x: "27/02/2019", y: randomScalingFactor()},
    //         {x: "29/02/2019", y: randomScalingFactor()},
    //     ];

    //     // colors used as the point background colors as well as the fill colors
    //     var fillColors = [
    //         chartColors.green,
    //         chartColors.green,
    //         chartColors.red,
    //         chartColors.red,
    //         chartColors.red,
    //         chartColors.red,
    //         chartColors.blue,
    //         chartColors.blue,
    //         chartColors.blue,
    //         chartColors.purple,
    //         chartColors.purple,
    //         chartColors.purple,
    //     ];

    //     // get the canvas context and draw the chart
    //     var ctx = document.getElementById("canvas").getContext("2d");
    //     var myLine = new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //                 labels: labels,
    //                 datasets: [{
    //                     label: "My Dataset",
    //                     backgroundColor: fillColors, // now we can pass in an array of colors (before it was only 1 color)
    //                     borderColor: fillColors,
    //                     pointBackgroundColor: fillColors,
    //                     fill: true,
    //                     data: lineData,
    //                 }]
    //         },
    //         options: {
    //             responsive: true,
    //             title: {
    //             display: true,
    //                 text:'Chart.js - Line Chart With Colored Fill Regions'
    //             },
    //             legend: {
    //                 display: false,
    //             },
    //             scales: {
    //             xAxes: [{
    //                 type: 'time',
    //                 bounds: 'ticks',
    //                 time: {
    //                     parser: 'DD/MM/YYYY',
    //                     unit: 'month',
    //                     min: new Date("2019-01-01"),
    //                     max: new Date("2019-12-30"),
    //                     stepSize: 1
    //                 },
    //                 gridLines: {
    //                 // offsetGridLines: true
    //                 },
    //             }]
    //             }
    //         },
    //         plugins: [{
    //             beforeRender: function (x, options) {
    //                 console.log(x.config.data.datasets[0]._meta[0].dataset._children)
    //                 // var c = x.chart
    //                 var dataset = x.data.datasets[0];
    //                 var model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;                        
    //                 // var yScale = x.scales['y-axis-0'];
    //                 // var yPos = yScale.getPixelForValue(0);
    //                 // var minX = 74.22306305162047;   //36.021484375
    //                 // var maxX = 493.1432743418808;
    //                 // var gradientFill = c.ctx.createLinearGradient(minX, 0, maxX, 0);
    //                 // gradientFill.addColorStop(0.1, 'yellow');
    //                 // gradientFill.addColorStop(0.0, 'green');
    //                 // gradientFill.addColorStop(0.2, 'gray');
    //                 // gradientFill.addColorStop(0.3, 'red');
    //                 // gradientFill.addColorStop(0.4, 'yellow');
    //                 // gradientFill.addColorStop(0.5, 'green');
    //                 // gradientFill.addColorStop(0.6, 'green');
    //                 // gradientFill.addColorStop(0.7, 'green');
    //                 // // gradientFill.addColorStop(yPos / c.height - 0.10, 'green');
    //                 // // gradientFill.addColorStop(yPos / c.height + 0.01, 'red');
    //                 // // gradientFill.addColorStop(1, 'red');

    //                 var obj = x.config.data.datasets[0]._meta[0].dataset;
    //                 var view = obj._view;
    //                 var backgroundColors = obj._chart.controller.data.datasets[obj._datasetIndex].backgroundColor;
    //                 var points = obj._children;
    //                 var ctx = obj._chart.ctx;
    //                 var minX = points[0]._model.x;
    //                 var maxX = points[points.length - 1]._model.x;
    //                 // minX = 74.22306305162047;   //36.021484375
    //                 maxX = 493.1432743418808;
    //                 var linearGradient = ctx.createLinearGradient(minX, 0, maxX, 0);

    //                 points.forEach(function(point, i) { // start original code
    //                     // `addColorStop` expects a number between 0 and 1, so we
    //                     // have to normalize the x position of each point between 0 and 1
    //                     // and round to make sure the positioning isn't too percise 
    //                     // (otherwise it won't line up with the point position)
    //                     var colorStopPosition = roundNumber((point._model.x - minX) / (maxX - minX), 2);
    //                     // special case for the first color stop
    //                     if (i === 0) {
    //                         linearGradient.addColorStop(0, backgroundColors[i]);
    //                     } else {
    //                         // only add a color stop if the color is different
    //                         if ( backgroundColors[i] !== backgroundColors[i-1]) {
    //                         // add a color stop for the prev color and for the new color at the same location
    //                         // this gives a solid color gradient instead of a gradient that fades to the next color
    //                         linearGradient.addColorStop(colorStopPosition, backgroundColors[i - 1]);
    //                         linearGradient.addColorStop(colorStopPosition, backgroundColors[i]);
    //                         }
    //                     }
    //                 });

    //                 model.backgroundColor = linearGradient;
    //             }
    //         }]
    //     });
    // }
});
