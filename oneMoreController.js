function iniciar() {
// drawAngularChart();
drawCanvasChart();
// drawChartJS();
}

function drawAngularChart() {
vm.labels = [new Date("2019-01-01"), new Date("2019-12-30")];
// vm.series = ['Series A', 'Series B'];
var data = [
    { x: "09/01/2019", y: 0, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "10/01/2019", y: 175, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "11/01/2019", y: 178, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "13/01/2019", y: 178, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "14/01/2019", y: 179, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "15/01/2019", y: 180, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "16/01/2019", y: 181, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "17/01/2019", y: 182, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "18/01/2019", y: 183, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
    { x: "18/02/2019", y: 183, z: 'XPTO', campanha: "Domicílio", periodo: "1" },
];
vm.data = [data];
vm.onClick = function (points, evt) {
    console.log(points, evt);
};
vm.datasetOverride = [
    {
        label: 'MDR Negociado ',
        // data: [
        //     { x: "04/01/2019", y: 0 },
        //     { x: "10/01/2019", y: 175 },
        //     { x: "11/01/2019", y: 178 },
        //     { x: "13/01/2019", y: 178 },
        // ],
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
    // {
    //     label: 'MDR por VOP ',
    //     // data: [
    //     //     { x: "04/01/2019", y: null},
    //     //     { x: "10/01/2019", y: null},
    //     //     { x: "11/01/2019", y: null},
    //     //     { x: "13/01/2019", y: 0 },
    //     //     { x: "14/01/2019", y: 179 },
    //     //     { x: "15/01/2019", y: 180 },
    //     //     { x: "16/01/2019", y: 181 },
    //     //     { x: "17/01/2019", y: 182 },
    //     //     { x: "18/01/2019", y: 183, z: 134 }
    //     // ],
    //     backgroundColor: 'rgba(89, 190, 93, 0.7)',
    //     borderColor: 'rgba(89, 190, 93, 0.7)',
    //     borderWidth: 1,
    //     spanGaps: false,
    //     pointBackgroundColor: 'transparent',
    //     pointBorderColor: 'transparent',
    //     pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
    //     pointHoverBorderColor: 'rgba(89, 190, 93, 1)',
    //     // yAxisID: 'second-y-axis'
    // },
];
vm.options = {
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
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
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
                var bodyLines = tooltipModel.body.map(getBody);

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
var originalController = Chart.controllers.line;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function(ease) {
        originalController.prototype.draw.call(this, ease);
        // pintarGrafico(this.chart);
        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0];
            var ctx = this.chart.ctx;
            var tooltipX = activePoint.tooltipPosition().x;
            var tooltipY = activePoint.tooltipPosition().y;
            var bottomY = this.chart.scales['y-axis-0'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(tooltipX, tooltipY);
            ctx.lineTo(tooltipX, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#07C';
            ctx.stroke();
            ctx.restore();
        }

        var scale = this.scale;
        // Iniciando desenho da legenda
        this.chart.ctx.save();
        this.chart.ctx.strokeStyle = "rgba(235, 235, 235, 1)";
        var points = this.chart.getDatasetMeta(0).data;
        var chartData = this.chart.data.datasets[0].data;

        var point_x = points[0]._model.x;
        var point_y = points[0]._model.y;

        for (var i = 0; i < points.length; i++) {
            this.chart.ctx.beginPath();
            this.chart.ctx.lineWidth = 20;
            // Adicionando mais 15 na coordenada Y para deixar a legenda abaixo do gráfico
            var positionFixed = point_y - point_y + this.chart.chartArea.bottom + 15;
            this.chart.ctx.moveTo(point_x, positionFixed);
            this.chart.ctx.lineTo(points[i]._model.x, positionFixed);

            point_x = points[i]._model.x;
            point_y = points[i]._model.y;

            this.chart.ctx.stroke();
        }
        this.chart.ctx.restore();

        var centralPoint = ((points[3]._model.x + points[12]._model.x) * 0.50);
        this.chart.ctx.fillStyle = "rgba(125, 125, 125, 1)";
        this.chart.ctx.font = "12px Arial";
        var texto = "1";
        var textWidth = this.chart.ctx.measureText(texto).width;
        this.chart.ctx.textAlign = "center";
        this.chart.ctx.textBaseline = "middle";
        this.chart.ctx.fillText(texto, centralPoint, this.chart.chartArea.bottom + 17);
        this.chart.ctx.restore();
        // Iniciando desenho da legenda - FIM
    }
});

// testando draw - FIM
var ctx = document.getElementById('myChart').getContext('2d');
var ctxOptions = {
    type: 'line',
    data: {
        // labels: [new Date("2019-01-01"), new Date("2019-11-30")],
        datasets: [{
            label: 'MDR Negociado',
            data: [
                { x: "09/01/2018", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "10/01/2018", y: 300, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "10/01/2018", y: null, mdr: "", campanha: "", periodo: "" },
                { x: "01/01/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "02/01/2019", y: 10, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "03/01/2019", y: 20, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "04/01/2019", y: 25, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "05/01/2019", y: 30, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "06/01/2019", y: 33, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "07/01/2019", y: 20, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "08/01/2019", y: 50, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "09/01/2019", y: 52, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "10/01/2019", y: 34, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "11/01/2019", y: 33, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "12/01/2019", y: 60, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "13/01/2019", y: 61, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "14/01/2019", y: 62, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "15/01/2019", y: 63, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "16/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "17/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "18/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "19/01/2019", y: 180, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "20/01/2019", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "21/01/2019", y: 211, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "22/01/2019", y: 212, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "22/01/2019", y: null, mdr: "", campanha: "", periodo: "" },
                { x: "01/02/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "02/02/2019", y: 22, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "03/02/2019", y: 25, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "04/02/2019", y: 27, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "05/02/2019", y: 31, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "06/02/2019", y: 35, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "07/02/2019", y: 37, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "08/02/2019", y: 39, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "09/02/2019", y: 41, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "10/02/2019", y: 43, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "11/02/2019", y: 45, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "12/02/2019", y: 49, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "13/02/2019", y: 60, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "14/02/2019", y: 68, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "15/02/2019", y: 170, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "16/02/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
                { x: "17/02/2019", y: 183, mdr: "XPTO", campanha: "Domicílio", periodo: "1" },
            ],
            // data: [
            //     { x: "09/01/2018", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "10/01/2018", y: 300, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "10/01/2018", y: NaN, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
            //     { x: "09/01/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "10/01/2019", y: 140, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "11/01/2019", y: 141, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "13/01/2019", y: 142, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "14/01/2019", y: 143, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "15/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "16/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "17/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/02/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/02/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
            //     { x: "18/03/2019", y: 175, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "2" },
            //     { x: "18/04/2019", y: 175, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "2" },
            //     { x: "18/04/2019", y: NaN, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
            //     { x: "18/06/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/07/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/08/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/09/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/09/2019", y: NaN, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
            //     { x: "18/10/2019", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/11/2019", y: 211, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            //     { x: "18/12/2019", y: 212, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
            // ],
            backgroundColor: [
                'rgba(89, 190, 93, 0.6)',
                'rgba(89, 190, 93, 0.6)',
                'transparent',      // NaN
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
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
                'rgba(89, 190, 93, 0.6)',
                'transparent',   // NaN
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 137, 213, 0.6)',
                'rgba(89, 190, 93, 0.6)',
                'rgba(89, 190, 93, 0.6)',
                'rgba(89, 190, 93, 0.6)',                            
            ],
            fill: 'origin',
            spanGaps: false,
            borderWidth: 1,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointHoverBorderColor: 'rgba(89, 137, 213, 1)',
        },
        // {
        //     label: 'MDR por VOP',
        //     data: [
        //         { x: "09/01/2018", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "10/01/2018", y: 300, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "10/01/2018", y: NaN, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
        //         { x: "09/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "10/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "11/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "13/01/2019", y: null, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "14/01/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "15/01/2019", y: 180, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "16/01/2019", y: 181, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "17/01/2019", y: 182, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/01/2019", y: 183, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/02/2019", y: 183, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/02/2019", y: NaN, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
        //         { x: "18/03/2019", y: 175, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "2" },
        //         { x: "18/04/2019", y: 175, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "2" },
        //         { x: "18/04/2019", y: NaN, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
        //         { x: "18/06/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/07/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/08/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/09/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/09/2019", y: NaN, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: NaN },
        //         { x: "18/10/2019", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/11/2019", y: 211, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //         { x: "18/12/2019", y: 212, mdr: "XPTO", campanha: "Domicílio", periodo: "1, periodo: "1" },
        //     ],
        //     backgroundColor: [
        //         'rgba(89, 137, 213, 0.6)',                            
        //     ],
        //     // fill: 'origin',
        //     spanGaps: false,
        //     borderWidth: 1,
        //     pointBackgroundColor: 'transparent',
        //     pointBorderColor: 'transparent',
        //     pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        //     pointHoverBorderColor: 'rgba(89, 137, 213, 1)',
        // }
        ],
    },
    options: {
        tooltips: {
            enabled: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    var dados = data['datasets'][tooltipItem['datasetIndex']]['data'][tooltipItem['index']];
                    var dadosRetornados = "";
                    if (dados) {
                        dadosRetornados = "Data: " + dados.x + "<br>";
                        dadosRetornados += "Valor: R$ " + dados.y + "<br>";
                        dadosRetornados += "MDR: " + dados.z + "<br>";
                        dadosRetornados += "Campanha: " + dados.a;
                    }
                    return dadosRetornados;
                },
            },
            custom: gerarTooltip        // função que gera a tooltip customizada do gráfico
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                bottom: 80
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
        legendCallback: gerarLegenda,
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
                    fontFamily: "'Arial'",
                    fontSize: 11,
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
        beforeRender: pintarGrafico,
        afterDraw: pintarGrafico
    }]
}
var myChart = new Chart(ctx, ctxOptions);
var legend = myChart.generateLegend();
document.getElementById('myLegend').insertAdjacentHTML('beforeend', legend);
const canvas = document.getElementById('myChart');
const ctxz = canvas.getContext('2d');
}

function pintarGrafico(x, options) {
// O gráfico em linha (type: 'line') não permiti adicionar um array de cores para o background, apenas uma;
// neste caso precisamos criar um gradiente entre cada um dos pontos do gráfico para separar as cores
var dataset = x.data.datasets[0];
var model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
var obj = x.config.data.datasets[0]._meta[0].dataset;
var view = obj._view;
var backgroundColors = obj._chart.controller.data.datasets[obj._datasetIndex].backgroundColor;
var points = x.getDatasetMeta(0).data;
var ctx = obj._chart.ctx;
var minX = points[0]._view.x;
var maxX = points[points.length - 1]._view.x;
var linearGradient = ctx.createLinearGradient(minX, 0, maxX, 0);

points.forEach(function(point, i) {
    // a função de `addColorStop` espera um número entre 0 e 1, neste caso temos que normalizar a posição x
    // de cada ponto entre 0 e 1 e dá um round para se certificar que o posicionamento não é muito preciso,
    // caso contrário, não se alinhará com a posição do ponto
    // scale é a precisão do número gerado
    var roundNumber = function (num, scale) {
        var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
        if(num - number > 0) {
            return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
        } else {
            return number;
        }
    };
    var colorStopPosition = roundNumber((point._view.x - minX) / (maxX - minX), 3);
    // caso especial para a primeira cor
    if (i === 0) {
        linearGradient.addColorStop(0, backgroundColors[i]);
    } else {
        // vai adicionar a cor somente se for diferente da anterior
        if ( backgroundColors[i] !== backgroundColors[i-1]) {
        // adiciona a cor para o step anterior e para o novo step no mesmo local, para dar um tom de gradiente mais sólido
            linearGradient.addColorStop(colorStopPosition, backgroundColors[i - 1]);
            linearGradient.addColorStop(colorStopPosition, backgroundColors[i]);
        }
    }
});
ctx.fillStyle = linearGradient;

model.backgroundColor = linearGradient;
}

function gerarTooltip(tooltipModel) {
// Elemento tooltip do chartJS
var tooltipEl = document.getElementById('chartjs-tooltip');

// Cria o elemento na primeira renderização
if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    var divStyle = 'transform: translateY(-120%) translateX(-50%); min-width: 140px; background-color: white; border-radius: 2px; box-shadow: 0.5px 0.5px 1px 1px #dcdbdb;';
    tooltipEl.setAttribute("style", divStyle);
    tooltipEl.innerHTML = '<table style="font-size: 11px; font-family: Arial; color: rgba(136, 136, 136, 1);"></table>';
    document.body.appendChild(tooltipEl);
}

// Esconde se não tiver tooltip
if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
}

// Seta a posição
tooltipEl.classList.remove('above', 'below', 'no-transform');
if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
} else {
    tooltipEl.classList.add('no-transform');
}

function getBody(bodyItem) {
    return bodyItem.lines;
}

// Seta o texto
if (tooltipModel.body) {
    var titleLines = tooltipModel.title || [];
    var bodyLines = tooltipModel.body.map(getBody);

    var innerHtml = '<thead>';

    // titleLines.forEach(function(title) {
    //     innerHtml += '<tr><th>' + title + '</th></tr>';
    // });
    innerHtml += '</thead><tbody>';
    bodyLines.forEach(function(body, i) {
        var colors = tooltipModel.labelColors[i];
        var style = 'background:' + colors.backgroundColor;
        style += '; border-color:' + colors.borderColor;
        style += '; border-width: 2px';
        var span = '<span style="' + style + '"></span>';
        innerHtml += '<tr><td>' + span + body + '</td></tr>';
    });
    innerHtml += '</tbody>';

    var tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
}

// `this` será o tooltip sobrescrito
var position = this._chart.canvas.getBoundingClientRect();

// Display, position, e seta estilos para a fonte
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

function gerarLegenda(chart) {
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

// chart.ctx.retore();
// var divStyle = "margin-left: 2%; background-color: rgba(235, 235, 235, 1); width: 10%; text-align: center";
// text.push("<div style='display: flex; margin-left: -5px'>");
text.push("<label style='position: absolute; transform: translateY(-73px) translateX(-2px)'>Períodos</label>");
text.push("<label style='position: absolute; transform: translateY(-45px) translateX(-14px)'>Campanha</label>");
// text.push("<div style='" + divStyle + "'>1</div>");
// text.push("<div style='" + divStyle + "'>2</div>");
// text.push("</div>");
return text.join("");
}

// função de teste dos gráficos
function drawChartJS() {
var chartColors = {
    red: 'rgba(255, 99, 132)',
    orange: 'rgba(255, 159, 64)',
    yellow: 'rgba(255, 205, 86)',
    green: 'rgba(75, 192, 192)',
    blue: 'rgba(54, 162, 235)',
    purple: 'rgba(153, 102, 255)',
    grey: 'rgba(231,233,237)'
};

// used to generate random data point values
var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
};

// decimal rounding algorithm
// see: https://plnkr.co/edit/uau8BlS1cqbvWPCHJeOy?p=preview
var roundNumber = function (num, scale) {
    var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
    if(num - number > 0) {
        return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
    } else {
        return number;
    }
};

var labels = [new Date("2019-01-02"), new Date("2019-12-30")];
// var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// var lineData = [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()];
var lineData = [
    {x: "01/02/2019", y: randomScalingFactor(), a: true},
    {x: "04/02/2019", y: randomScalingFactor(), a: true},
    {x: "07/02/2019", y: randomScalingFactor(), a: true},
    {x: "10/02/2019", y: randomScalingFactor()},
    {x: "12/02/2019", y: randomScalingFactor()},
    {x: "14/02/2019", y: randomScalingFactor()},
    {x: "16/02/2019", y: randomScalingFactor()},
    {x: "20/02/2019", y: randomScalingFactor()},
    {x: "23/02/2019", y: randomScalingFactor()},
    {x: "25/02/2019", y: randomScalingFactor()},
    {x: "27/02/2019", y: randomScalingFactor()},
    {x: "29/02/2019", y: randomScalingFactor()},
];

// colors used as the point background colors as well as the fill colors
var fillColors = [
    chartColors.green,
    chartColors.green,
    chartColors.red,
    chartColors.red,
    chartColors.red,
    chartColors.red,
    chartColors.blue,
    chartColors.blue,
    chartColors.blue,
    chartColors.purple,
    chartColors.purple,
    chartColors.purple,
];

// get the canvas context and draw the chart
var ctx = document.getElementById("canvas").getContext("2d");
var myLine = new Chart(ctx, {
    type: 'line',
    data: {
            labels: labels,
            datasets: [{
                label: "My Dataset",
                backgroundColor: fillColors, // now we can pass in an array of colors (before it was only 1 color)
                borderColor: fillColors,
                pointBackgroundColor: fillColors,
                fill: true,
                data: lineData,
            }]
    },
    options: {
        responsive: true,
        title: {
        display: true,
            text:'Chart.js - Line Chart With Colored Fill Regions'
        },
        legend: {
            display: false,
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
            // offsetGridLines: true
            },
        }]
        }
    },
    plugins: [{
        beforeRender: function (x, options) {
            console.log(x.config.data.datasets[0]._meta[0].dataset._children)
            // var c = x.chart
            var dataset = x.data.datasets[0];
            var model = x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;                        
            // var yScale = x.scales['y-axis-0'];
            // var yPos = yScale.getPixelForValue(0);
            // var minX = 74.22306305162047;   //36.021484375
            // var maxX = 493.1432743418808;
            // var gradientFill = c.ctx.createLinearGradient(minX, 0, maxX, 0);
            // gradientFill.addColorStop(0.1, 'yellow');
            // gradientFill.addColorStop(0.0, 'green');
            // gradientFill.addColorStop(0.2, 'gray');
            // gradientFill.addColorStop(0.3, 'red');
            // gradientFill.addColorStop(0.4, 'yellow');
            // gradientFill.addColorStop(0.5, 'green');
            // gradientFill.addColorStop(0.6, 'green');
            // gradientFill.addColorStop(0.7, 'green');
            // // gradientFill.addColorStop(yPos / c.height - 0.10, 'green');
            // // gradientFill.addColorStop(yPos / c.height + 0.01, 'red');
            // // gradientFill.addColorStop(1, 'red');

            var obj = x.config.data.datasets[0]._meta[0].dataset;
            var view = obj._view;
            var backgroundColors = obj._chart.controller.data.datasets[obj._datasetIndex].backgroundColor;
            var points = obj._children;
            var ctx = obj._chart.ctx;
            var minX = points[0]._model.x;
            var maxX = points[points.length - 1]._model.x;
            // minX = 74.22306305162047;   //36.021484375
            maxX = 493.1432743418808;
            var linearGradient = ctx.createLinearGradient(minX, 0, maxX, 0);

            points.forEach(function(point, i) { // start original code
                // `addColorStop` expects a number between 0 and 1, so we
                // have to normalize the x position of each point between 0 and 1
                // and round to make sure the positioning isn't too percise 
                // (otherwise it won't line up with the point position)
                var colorStopPosition = roundNumber((point._model.x - minX) / (maxX - minX), 2);
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
});
}
