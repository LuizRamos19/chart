(function () {

    "use strict";

    /**
     * @ngdoc factory
     * @name desenharGrafico.Factory
     *
     * @methodOf apl-web-crh.reestruturacao-campanha:desenharGrafico
     *
     * @description
     * Factory desenharGrafico para construir o gráfico da tela de ciclo de vida de um EC
     */
    angular.module("apl-web-crh.reestruturacao-campanha").factory("desenharGrafico", desenharGrafico);

    desenharGrafico.$inject = [];

    /**
     * @ngdoc method
     * @name  desenharGrafico
     *
     * @methodOf apl-web-crh.reestruturacao-campanha: desenharGrafico
     *
     * @description
     * Contem metodos responsaveis por desenhar o grafico utilizando chart.js.
     **/
    function desenharGrafico() {
        return {
            gerarGrafico: gerarGrafico
        };

        /**
         * @ngdoc method
         * @name  gerarGrafico
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @param {object} graficoElemento representa o contexto em 2D do gráfico em canvas
         * @param {HTMLElement} legendaElemento representa o elemento HTML da legenda do gráfico
         * @param {object} dados representa os valores que serão populados no gráfico (x e y são as coordenadas)
         * 
         * @description
         * Responsavel por adicionar os dados e configurações que irão ser utilizadas pelo gráfico
         **/
        function gerarGrafico(graficoElemento, legendaElemento, dados) {
            // testando draw
            var originalController = Chart.controllers.line;
            Chart.controllers.line = Chart.controllers.line.extend({
                draw: function(ease) {
                    originalController.prototype.draw.call(this, ease);
                    // pintarGrafico(this.chart);
                    gerarLinhaVertical(this.chart);
                    gerarPeriodosCampanha(this.chart);
                }
            });
            // testando draw - FIM

            var ctxOptions = {
                type: "line",
                data: {
                    // labels: [new Date("2019-01-02"), new Date("2019-01-30")],
                    datasets: [{
                        label: "MDR Negociado",
                        data: dados,
                        backgroundColor: dados,
                        fill: "origin",
                        spanGaps: false,
                        borderWidth: 1,
                        pointBackgroundColor: "transparent",
                        pointBorderColor: "transparent",
                        pointHoverBackgroundColor: "rgba(255, 255, 255, 1)",
                        pointHoverBorderColor: "rgba(89, 137, 213, 1)"
                    }]
                },
                options: {
                    tooltips: {
                        enabled: false,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var dados = data["datasets"][tooltipItem["datasetIndex"]]["data"][tooltipItem["index"]];
                                var dadosRetornados = "";
                                if (dados) {
                                    dadosRetornados = "Data: " + dados.x + "<br>";
                                    dadosRetornados += "Valor: R$ " + dados.y + "<br>";
                                    dadosRetornados += "MDR: " + dados.mdr + "<br>";
                                    dadosRetornados += "Campanha: " + dados.campanha;
                                }
                                return dadosRetornados;
                            }
                        },
                        custom: gerarTooltip        // função que gera a tooltip customizada do gráfico
                    },
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            bottom: 60
                        }
                    },
                    legend: {
                        display: false,
                        position: "bottom",
                        // boxWidth: 100,
                        labels: {
                            fontColor: "rgba(154, 154, 154, 1)"
                        }
                    },
                    legendCallback: gerarLegenda,
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                        // point: {
                        //     radius: 0,
                        //     hoverRadius: 5,
                        // }
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            bounds: "ticks",
                            time: {
                                parser: "DD/MM/YYYY",
                                unit: "month",
                                min: new Date("2019-01-01"),
                                max: new Date("2019-12-30"),
                                stepSize: 1
                            },
                            gridLines: {
                                // display: false,
                                color: "rgba(190, 190, 190, 1)",
                                lineWidth: 2,
                                drawBorder: false
                            },
                            position: "top",
                            ticks: {
                                fontFamily: "'Arial'",
                                fontSize: 11,
                                fontColor: "rgba(136, 136, 136, 1)",
                                // bounds: "ticks"
                                padding: 5,
                                // max: 0,
                                // min: 300,
                                beginAtZero: true
                                
                                // stepSize: 0.5,
                                // autoSkip: false,
                                // autoSkipPadding: 5,
                                // source: "labels"
                            },
                            // borderDash: [10, 10],
                            // borderDashOffset: 1.0,
                            // drawBorder: true,
                            // offsetGridLines: true
                            stacked: true
                        }],
                        yAxes: [{
                            gridLines: {
                                borderDash: [5],
                                drawTicks: false
                            },
                            ticks: {
                                min: 0,
                                max: 300,
                                beginAtZero: true,
                                fontColor: "rgba(203, 203, 203, 1)",
                                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                padding: 5,
                                stepSize: 50,
                                // Inclui um valor de milhar em (k) no final do número
                                callback: function(value) {
                                    if (value != 0) {
                                        return value + "k";
                                    } else {
                                        // Ignorando a mostra do número 0
                                        return "";
                                    }
                                }
                            },
                            stacked: true
                        }]
                    }
                },
                plugins: [{
                    beforeRender: pintarGrafico,
                    afterDraw: pintarGrafico
                }]
            };
            var myChart = new Chart(graficoElemento, ctxOptions);
            var legend = myChart.generateLegend();
            legendaElemento.insertAdjacentHTML("beforeend", legend);
        }

        /**
         * @ngdoc method
         * @name  pintarGrafico
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por pintar o gráfico de diferentes cores
         **/
        function pintarGrafico(chart) {
            // O gráfico em linha (type: 'line') não permiti adicionar um array de cores para o background, apenas uma;
            // neste caso precisamos criar um gradiente entre cada um dos pontos do gráfico para separar as cores
            var dataset = chart.data.datasets[0];
            var model = chart.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset._model;
            var obj = chart.config.data.datasets[0]._meta[0].dataset;
            // var view = obj._view;
            var backgroundColors = obj._chart.controller.data.datasets[obj._datasetIndex].backgroundColor;
            var points = chart.getDatasetMeta(0).data;
            var ctx = obj._chart.ctx;
            var minX = points[0]._view.x;
            var maxX = points[points.length - 1]._view.x;
            var linearGradient = ctx.createLinearGradient(minX, 0, maxX, 0);

            points.forEach(function(point, i) {
                // a função de `addColorStop` espera um número entre 0 e 1, neste caso temos que normalizar a posição x
                // de cada ponto entre 0 e 1 e dá um round para se certificar que o posicionamento não é muito preciso,
                // caso contrário, não se alinhará com a posição do ponto
                // scale é a precisão do número gerado
                // Algoritmo decimal
                var colorStopPosition = arredondarNumero((point._view.x - minX) / (maxX - minX), 5);
                // caso especial para a primeira cor

                if (i === 0) {
                    linearGradient.addColorStop(0, backgroundColors[i].cor);
                } else if (backgroundColors[i].cor !== backgroundColors[i - 1].cor) {
                    // vai adicionar a cor somente se for diferente da anterior
                    // adiciona a cor para o step anterior e para o novo step no mesmo local, para dar um tom de gradiente mais sólido
                    linearGradient.addColorStop(colorStopPosition, backgroundColors[i - 1].cor);
                    linearGradient.addColorStop(colorStopPosition, backgroundColors[i].cor);
                }
            });
            model.backgroundColor = linearGradient;
        }

        /**
         * @ngdoc method
         * @name  gerarTooltip
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por gerar o tooltip customizado do gráfico
         **/
        function gerarTooltip(tooltipModel) {
            // Elemento tooltip do chartJS
            var tooltipEl = document.getElementById("chartjs-tooltip");

            // Cria o elemento na primeira renderização
            if (!tooltipEl) {
                tooltipEl = document.createElement("div");
                tooltipEl.id = "chartjs-tooltip";
                var divStyle = "transform: translateY(-120%) translateX(-50%); min-width: 140px; background-color: white; border-radius: 2px; box-shadow: 0.5px 0.5px 1px 1px #dcdbdb;";
                tooltipEl.setAttribute("style", divStyle);
                tooltipEl.innerHTML = "<table style=" + "font-size: 11px; font-family: Arial; color: rgba(136, 136, 136, 1);" + "></table>";
                document.body.appendChild(tooltipEl);
            }

            // Esconde se não tiver tooltip
            if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // Seta a posição
            tooltipEl.classList.remove("above", "below", "no-transform");
            if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
                tooltipEl.classList.add("no-transform");
            }

            // function getBody(bodyItem) {
            //     return bodyItem.lines;
            // }

            // Seta o texto
            if (tooltipModel.body) {
                // var titleLines = tooltipModel.title || [];
                var bodyLines = tooltipModel.body.map(function(bodyItem) { return bodyItem.lines });

                var innerHtml = "<thead>";

                // titleLines.forEach(function(title) {
                //     innerHtml += "<tr><th>" + title + "</th></tr>";
                // });
                innerHtml += "</thead><tbody>";
                bodyLines.forEach(function(body, i) {
                    var colors = tooltipModel.labelColors[i];
                    var style = "background:" + colors.backgroundColor;
                    style += "; border-color:" + colors.borderColor;
                    style += "; border-width: 2px";
                    var span = "<span style=" + style + "></span>";
                    innerHtml += "<tr><td>" + span + body + "</td></tr>";
                });
                innerHtml += "</tbody>";

                var tableRoot = tooltipEl.querySelector("table");
                tableRoot.innerHTML = innerHtml;
            }

            // `this` será o tooltip sobrescrito
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, e seta estilos para a fonte
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + "px";
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + "px";
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
            tooltipEl.style.pointerEvents = "none";
        }

        /**
         * @ngdoc method
         * @name  gerarLegenda
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por gerar a legenda do gráfico
         **/
        function gerarLegenda(chart) {
            var text = [];
            text.push("<label style='position: absolute; transform: translateY(-53px) translateX(-55px)'>Períodos</label>");
            text.push("<label style='position: absolute; transform: translateY(-30px) translateX(-67px)'>Campanha</label>");
            text.push("<div style='display: flex;'>");
            text.push("<div style='width: 30px; height: 15px; background-color: rgba(89, 137, 213, 0.6); margin-right: 5px'></div>");
            text.push("<label style='margin-right: 100px'>MDR Negociado: </label>");
            text.push("<div style='width: 30px; height: 15px; background-color: rgba(89, 190, 93, 0.6); margin-right: 5px'></div>");
            text.push("<label>MDR por VOP: </label>");
            text.push("</div>");
            // text.push("<div style='" + divStyle + "'>1</div>");
            // text.push("<div style='" + divStyle + "'>2</div>");
            // text.push("</div>");
            return text.join("");
        }

        /**
         * @ngdoc method
         * @name  gerarLinhaVertical
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por gerar a linha vertical toda a vez que aparecer o tooltip
         **/
        function gerarLinhaVertical(chart) {
            if (chart.tooltip._active && chart.tooltip._active.length) {
                var activePoint = chart.tooltip._active[0];
                var ctx = chart.ctx;
                var tooltipX = activePoint.tooltipPosition().x;
                var tooltipY = activePoint.tooltipPosition().y;
                var bottomY = chart.scales["y-axis-0"].bottom;
    
                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([5, 5]);
                ctx.moveTo(tooltipX, tooltipY);
                ctx.lineTo(tooltipX, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#07C";
                ctx.stroke();
                ctx.restore();
            }
        }

        /**
         * @ngdoc method
         * @name  gerarPeriodosCampanha
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por gerar as informações de campanha e períodos bem como desenhar as linhas que ficam abaixo do gráfico
         **/
        function gerarPeriodosCampanha(chart) {
            var pontos = chart.getDatasetMeta(0).data;
            var dadosGrafico = chart.data.datasets[0].data;
            
            var point_x = pontos[0]._model.x;
            var point_y = pontos[0]._model.y;
            // var periodoInicial = dadosGrafico[0].periodo;

            for (var i = 0; i < pontos.length; i++) {
                if ((i + 1 === pontos.length || dadosGrafico[i + 1].y === null)) {
                    chart.ctx.save();
                    chart.ctx.strokeStyle = "rgba(235, 235, 235, 1)";

                    chart.ctx.beginPath();
                    chart.ctx.lineWidth = 20;
                    // Adicionando mais 15 na coordenada Y para deixar a legenda abaixo do gráfico
                    var positionFixed = point_y - point_y + chart.chartArea.bottom + 15;
                    chart.ctx.moveTo(point_x, positionFixed);
                    chart.ctx.lineTo(pontos[i]._model.x, positionFixed);
                    // point_x = pontos[i]._model.x;
                    // point_y = pontos[i]._model.y;

                    chart.ctx.stroke();
                    
                    var centralPoint = ((point_x + pontos[i]._model.x) * 0.50);
                    chart.ctx.fillStyle = "rgba(125, 125, 125, 1)";
                    chart.ctx.font = "12px Arial";
                    var texto = dadosGrafico[i].periodo;
                    var textWidth = chart.ctx.measureText(texto).width;
                    chart.ctx.textAlign = "center";
                    chart.ctx.textBaseline = "middle";
                    chart.ctx.fillText(texto, centralPoint, chart.chartArea.bottom + 17);
                    chart.ctx.restore();

                    if (i + 2 < pontos.length) {
                        point_x = pontos[i + 2]._model.x;
                        point_y = pontos[i + 2]._model.y;
                    }
                }

                if (dadosGrafico[i].y === null && pontos[i]._model.x > chart.chartArea.left) {
                    chart.ctx.save();
                    chart.ctx.strokeStyle = "rgba(255, 184, 184, 1)";
                    chart.ctx.beginPath();
                    chart.ctx.lineWidth = 40;
                    var positionFixed = chart.chartArea.bottom + 25;
                    chart.ctx.moveTo(pontos[i]._model.x + 1, positionFixed);
                    chart.ctx.lineTo(pontos[i + 1]._model.x - 1, positionFixed);

                    chart.ctx.stroke();
                    
                    // var centralPoint = ((pontos[i]._model.x + pontos[i+1]._model.x) * 0.50);
                    // chart.ctx.fillStyle = "rgba(246, 132, 132, 1)";
                    // chart.ctx.font = "12px Arial";
                    // var texto = "Inativo";
                    // var textWidth = chart.ctx.measureText(texto).width;
                    // chart.ctx.textAlign = "center";
                    // chart.ctx.textBaseline = "middle";
                    // chart.ctx.fillText(texto, centralPoint, chart.chartArea.bottom + 17);
                    // chart.ctx.restore();
                }
            }
            chart.ctx.restore();
        }

        /**
         * @ngdoc method
         * @name  arredondarNumero
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por gerar um número entre 0 e 1 para ser usado como posição do gráfico
         **/
        function arredondarNumero(num, scale) {
            var number = Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
            if(num - number > 0) {
                return (number + Math.floor(2 * Math.round((num - number) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
            } else {
                return number;
            }
        }

        // testando desenho do gráfico com angular-chart.js
        // function drawAngularChart() {
        //     // vm.labels = [new Date("2019-01-01"), new Date("2019-12-30")];
        //     // vm.series = ['Series A', 'Series B'];
        //     var originalController = Chart.controllers.line;
        //     Chart.controllers.line = Chart.controllers.line.extend({
        //         draw: function(ease) {
        //             originalController.prototype.draw.call(this, ease);
        //             pintarGrafico(this.chart);
        //             gerarLinhaVertical(this.chart);
        //             gerarPeriodosCampanha(this.chart);
        //         }
        //     });
        //     var data = [
        //         { x: "09/01/2018", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "10/01/2018", y: 300, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "10/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "01/01/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "02/01/2019", y: 10, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "03/01/2019", y: 20, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "04/01/2019", y: 25, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "05/01/2019", y: 30, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "06/01/2019", y: 33, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "07/01/2019", y: 20, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "08/01/2019", y: 50, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "09/01/2019", y: 52, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "10/01/2019", y: 34, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "11/01/2019", y: 33, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "12/01/2019", y: 60, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "13/01/2019", y: 61, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "14/01/2019", y: 62, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "15/01/2019", y: 63, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "16/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "17/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "18/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "19/01/2019", y: 180, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "20/01/2019", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "21/01/2019", y: 211, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "22/01/2019", y: 212, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "22/01/2019", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "23/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "24/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "25/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "01/02/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "02/02/2019", y: 22, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "03/02/2019", y: 25, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "04/02/2019", y: 27, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
        //         { x: "05/02/2019", y: 31, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
        //         { x: "06/02/2019", y: 35, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
        //         { x: "07/02/2019", y: 37, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
        //         { x: "08/02/2019", y: 39, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
        //         { x: "09/02/2019", y: 41, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "10/02/2019", y: 43, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "11/02/2019", y: 45, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "12/02/2019", y: 49, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "13/02/2019", y: 60, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "14/02/2019", y: 68, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
        //         { x: "15/02/2019", y: 170, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "16/02/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 190, 93, 0.6)" },
        //         { x: "17/02/2019", y: 183, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 190, 93, 0.6)" },
        //     ];
        //     vm.data = [data];
        //     vm.onClick = function (points, evt) {
        //         console.log(points, evt);
        //     };
        //     vm.datasetOverride = [
        //         {
        //             label: 'MDR Negociado',
        //             // data: data,
        //             backgroundColor: data,
        //             fill: 'origin',
        //             spanGaps: false,
        //             borderWidth: 1,
        //             pointBackgroundColor: 'transparent',
        //             pointBorderColor: 'transparent',
        //             pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        //             pointHoverBorderColor: 'rgba(89, 137, 213, 1)',
        //             // label: 'MDR Negociado ',
        //             // // data: [
        //             // //     { x: "04/01/2019", y: 0 },
        //             // //     { x: "10/01/2019", y: 175 },
        //             // //     { x: "11/01/2019", y: 178 },
        //             // //     { x: "13/01/2019", y: 178 },
        //             // // ],
        //             // backgroundColor: [
        //             //     'rgba(89, 137, 213, 0.7)',
        //             //     'rgba(89, 137, 213, 0.7)',
        //             //     'rgba(89, 137, 213, 0.7)',
        //             //     'rgba(89, 137, 213, 0.7)',
        //             //     'rgba(89, 190, 93, 0.7)',
        //             //     'rgba(89, 190, 93, 0.7)',
        //             //     'rgba(89, 190, 93, 0.7)',
        //             //     'rgba(89, 190, 93, 0.7)',
        //             //     'rgba(89, 190, 93, 0.7)',
        //             //     'rgba(89, 190, 93, 0.7)',
        //             // ],
        //             // borderColor: 'rgba(89, 137, 213, 0.7)',
        //             // // spanGaps: false,
        //             // borderWidth: 1,
        //             // pointBackgroundColor: 'transparent',
        //             // pointBorderColor: 'transparent',
        //             // pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        //             // pointHoverBorderColor: 'rgba(89, 137, 213, 1)',
        //             // // steppedLine: true
        //             // // yAxisID: 'first-y-axis'
        //         },
        //         // {
        //         //     label: 'MDR por VOP ',
        //         //     // data: [
        //         //     //     { x: "04/01/2019", y: null},
        //         //     //     { x: "10/01/2019", y: null},
        //         //     //     { x: "11/01/2019", y: null},
        //         //     //     { x: "13/01/2019", y: 0 },
        //         //     //     { x: "14/01/2019", y: 179 },
        //         //     //     { x: "15/01/2019", y: 180 },
        //         //     //     { x: "16/01/2019", y: 181 },
        //         //     //     { x: "17/01/2019", y: 182 },
        //         //     //     { x: "18/01/2019", y: 183, z: 134 }
        //         //     // ],
        //         //     backgroundColor: 'rgba(89, 190, 93, 0.7)',
        //         //     borderColor: 'rgba(89, 190, 93, 0.7)',
        //         //     borderWidth: 1,
        //         //     spanGaps: false,
        //         //     pointBackgroundColor: 'transparent',
        //         //     pointBorderColor: 'transparent',
        //         //     pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        //         //     pointHoverBorderColor: 'rgba(89, 190, 93, 1)',
        //         //     // yAxisID: 'second-y-axis'
        //         // },
        //     ];
        //     vm.options = {
        //         tooltips: {
        //             enabled: false,
        //             callbacks: {
        //                 label: function(tooltipItem, data) {
        //                     var dados = data['datasets'][tooltipItem['datasetIndex']]['data'][tooltipItem['index']];
        //                     var dadosRetornados = "";
        //                     if (dados) {
        //                         dadosRetornados = "Data: " + dados.x + "<br>";
        //                         dadosRetornados += "Valor: R$ " + dados.y + "<br>";
        //                         dadosRetornados += "MDR: " + dados.mdr + "<br>";
        //                         dadosRetornados += "Campanha: " + dados.campanha;
        //                     }
        //                     return dadosRetornados;
        //                 },
        //             },
        //             custom: gerarTooltip        // função que gera a tooltip customizada do gráfico
        //         },
        //         layout: {
        //             padding: {
        //                 left: 20,
        //                 right: 20,
        //                 bottom: 60
        //             }
        //         },
        //         legend: {
        //             display: false,
        //             position: 'bottom',
        //             // boxWidth: 100,
        //             labels: {
        //                 fontColor: 'rgba(154, 154, 154, 1)',
        //             },
        //         },
        //         legendCallback: gerarLegenda,
        //         elements: {
        //             line: {
        //                 tension: 0, // disables bezier curves
        //             },
        //             // point: {
        //             //     radius: 0,
        //             //     hoverRadius: 5,
        //             // }
        //         },
        //         scales: {
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
        //                     // display: false,
        //                     color: 'rgba(190, 190, 190, 1)',
        //                     lineWidth: 2,
        //                     drawBorder: false,
        //                 },
        //                 position: 'top',
        //                 ticks: {
        //                     fontFamily: "'Arial'",
        //                     fontSize: 11,
        //                     fontColor: "rgba(136, 136, 136, 1)",
        //                     // bounds: 'ticks'
        //                     padding: 5,
        //                     // max: 0,
        //                     // min: 300,
        //                     beginAtZero: true,
                            
        //                     // stepSize: 0.5,
        //                     // autoSkip: false,
        //                     // autoSkipPadding: 5,
        //                     // source: 'labels'
        //                 },
        //                 // borderDash: [10, 10],
        //                 // borderDashOffset: 1.0,
        //                 // drawBorder: true,
        //                 // offsetGridLines: true
        //                 stacked: true,
        //             }],
        //             yAxes: [{
        //                 gridLines: {
        //                     borderDash: [5],
        //                     drawTicks: false,
        //                 },
        //                 ticks: {
        //                     min: 0,
        //                     max: 300,
        //                     beginAtZero: true,
        //                     fontColor: 'rgba(203, 203, 203, 1)',
        //                     fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //                     padding: 5,
        //                     stepSize: 50,
        //                     // Inclui um valor de milhar em (k) no final do número
        //                     callback: function(value, index, values) {
        //                         if (value != 0) {
        //                             return value + "k";
        //                         } else {
        //                             // Ignorando a mostra do número 0
        //                             return "";
        //                         }
        //                     },
        //                 },
        //                 stacked: true
        //             }]
        //         },
        //         // tooltips: {
        //         //     enabled: false,
        //         //     // enabled: false,
        //         //     callbacks: {
        //         //         label: function(tooltipItem, data) {
        //         //             var dados = data['datasets'][tooltipItem['datasetIndex']]['data'][tooltipItem['index']];
        //         //             var dadosRetornados = "";
        //         //             if (dados) {
        //         //                 dadosRetornados = "Data: " + dados.x + "<br>";
        //         //                 dadosRetornados += "Valor: " + dados.y + "<br>";
        //         //                 dadosRetornados += "MDR: " + dados.mdr + "<br>";
        //         //                 dadosRetornados += "Campanha: " + dados.a;
        //         //             }
        //         //             return dadosRetornados;
        //         //         },
        //         //     },
        //         //     // backgroundColor: '#FFF',
        //         //     // titleFontSize: 16,
        //         //     // titleFontColor: '#0066ff',
        //         //     // bodyFontColor: '#000',
        //         //     // bodyFontSize: 14,
        //         //     // displayColors: false,
        //         //     custom: function(tooltipModel) {
        //         //         // Tooltip Element
        //         //         var tooltipEl = document.getElementById('chartjs-tooltip');

        //         //         // Create element on first render
        //         //         if (!tooltipEl) {
        //         //             tooltipEl = document.createElement('div');
        //         //             tooltipEl.id = 'chartjs-tooltip';
        //         //             var divStyle = 'transform: translateY(-120%) translateX(-50%); min-width: 140px; height: 65px; background-color: white; border-radius: 2px; box-shadow: 0.5px 0.5px 1px 1px #dcdbdb;';
        //         //             tooltipEl.setAttribute("style", divStyle);
        //         //             tooltipEl.innerHTML = '<table style="font-size: 10px; font-family: Arial; color: rgba(136, 136, 136, 1);"></table>';
        //         //             document.body.appendChild(tooltipEl);
        //         //         }

        //         //         // Hide if no tooltip
        //         //         if (tooltipModel.opacity === 0) {
        //         //             tooltipEl.style.opacity = 0;
        //         //             return;
        //         //         }

        //         //         // Set caret Position
        //         //         tooltipEl.classList.remove('above', 'below', 'no-transform');
        //         //         if (tooltipModel.yAlign) {
        //         //             tooltipEl.classList.add(tooltipModel.yAlign);
        //         //         } else {
        //         //             tooltipEl.classList.add('no-transform');
        //         //         }

        //         //         function getBody(bodyItem) {
        //         //             return bodyItem.lines;
        //         //         }

        //         //         // Set Text
        //         //         if (tooltipModel.body) {
        //         //             console.log("Teste ", tooltipModel)
        //         //             console.log("xLabel", tooltipModel.dataPoints[0].xLabel)
        //         //             console.log("yLabel", tooltipModel.dataPoints[0].yLabel)
        //         //             var titleLines = tooltipModel.title || [];
        //         //             var bodyLines = tooltipModel.body.map(getBody);

        //         //             var innerHtml = '<thead>';

        //         //             // titleLines.forEach(function(title) {
        //         //             //     innerHtml += '<tr><th>' + title + '</th></tr>';
        //         //             // });
        //         //             innerHtml += '</thead><tbody>';
        //         //             console.log("bodyLines", bodyLines)
        //         //             bodyLines.forEach(function(body, i) {
        //         //                 // if (i == 0) {   //valida apenas o primeiro indíce dos valores presente do body
        //         //                     var colors = tooltipModel.labelColors[i];
        //         //                     var style = 'background:' + colors.backgroundColor;
        //         //                     style += '; border-color:' + colors.borderColor;
        //         //                     style += '; border-width: 2px';
        //         //                     var span = '<span style="' + style + '"></span>';
        //         //                     innerHtml += '<tr><td>' + span + body + '</td></tr>';
        //         //                 // }
        //         //             });
        //         //             innerHtml += '</tbody>';

        //         //             var tableRoot = tooltipEl.querySelector('table');
        //         //             tableRoot.innerHTML = innerHtml;
        //         //         }

        //         //         // `this` will be the overall tooltip
        //         //         var position = this._chart.canvas.getBoundingClientRect();

        //         //         // Display, position, and set styles for font
        //         //         tooltipEl.style.opacity = 1;
        //         //         tooltipEl.style.position = 'absolute';
        //         //         tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        //         //         tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        //         //         tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        //         //         tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        //         //         tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        //         //         tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        //         //         tooltipEl.style.pointerEvents = 'none';
        //         //     }
        //         // },
        //         // layout: {
        //         //     padding: {
        //         //         left: 20,
        //         //         right: 20,
        //         //     }
        //         // },
        //         // legend: {
        //         //     display: false,
        //         //     position: 'bottom',
        //         //     // boxWidth: 100,
        //         //     labels: {
        //         //         fontColor: 'rgba(154, 154, 154, 1)',
        //         //         // generateLabels: function(chart) {
        //         //             // var data = chart.data;
        //         //             // if (data.labels.length && data.datasets.length) {
        //         //             //     return data.labels.map(function(label, i) {
        //         //             //         var meta = chart.getDatasetMeta(0);
        //         //             //         console.log(meta.controller)
        //         //             //         var style = meta.controller.getStyle(i);

        //         //             //         return {
        //         //             //             text: label,
        //         //             //             fillStyle: style.backgroundColor,
        //         //             //             strokeStyle: style.borderColor,
        //         //             //             lineWidth: style.borderWidth,
        //         //             //             hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,

        //         //             //             // Extra data used for toggling the correct item
        //         //             //             index: i
        //         //             //         };
        //         //             //     });
        //         //             // }
        //         //             // return [];
        //         //             // return {
        //         //             //     // Label that will be displayed
        //         //             //     text: chart.data.labels,
        //         //             //     // Fill style of the legend box
        //         //             //     fillStyle: "red",
        //         //             //     // If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect
        //         //             //     hidden: false,
        //         //             //     // For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap
        //         //             //     lineCap: "butt",
        //         //             //     // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
        //         //             //     lineDash: [10],
        //         //             //     // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
        //         //             //     lineDashOffset: 0,
        //         //             //     // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
        //         //             //     lineJoin: "bevel",
        //         //             //     // Width of box border
        //         //             //     lineWidth: 100,
        //         //             //     // Stroke style of the legend box
        //         //             //     strokeStyle: "red",
        //         //             //     // Point style of the legend box (only used if usePointStyle is true)
        //         //             //     // pointStyle: string
        //         //             // }
        //         //         // }
        //         //     },
        //         // },
        //         // legendCallback: function(chart) {
        //         //     var text = [];
        //         //     text.push('<ul class="' + chart.id + '-legend">');

        //         //     var data = chart.data;
        //         //     var datasets = data.datasets;
        //         //     var labels = data.labels;

        //         //     if (datasets.length) {
        //         //         for (var i = 0; i < datasets[0].data.length; ++i) {
        //         //             text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
        //         //             if (labels[i]) {
        //         //                 text.push(labels[i]);
        //         //             }
        //         //             text.push('</li>');
        //         //         }
        //         //     }

        //         //     text.push('</ul>');
        //         //     console.log(text)
        //         //     return text.join('');
        //         // },
        //         // elements: {
        //         //     line: {
        //         //         tension: 0, // disables bezier curves
        //         //     },
        //         //     // point: {
        //         //     //     radius: 0,
        //         //     //     hoverRadius: 5,
        //         //     // }
        //         // },
        //         // scales: {
        //         //     xAxes: [{
        //         //         type: 'time',
        //         //         bounds: 'ticks',
        //         //         time: {
        //         //             parser: 'DD/MM/YYYY',
        //         //             unit: 'month',
        //         //             min: new Date("2019-01-01"),
        //         //             max: new Date("2019-12-30"),
        //         //             stepSize: 1
        //         //         },
        //         //         gridLines: {
        //         //             // display: false,
        //         //             color: 'rgba(190, 190, 190, 1)',
        //         //             lineWidth: 2,
        //         //             drawBorder: false,
        //         //         },
        //         //         position: 'top',
        //         //         ticks: {
        //         //             fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //         //             // bounds: 'ticks'
        //         //             padding: 5,
        //         //             // max: 0,
        //         //             // min: 300,
        //         //             beginAtZero: true,
                            
        //         //             // stepSize: 0.5,
        //         //             // autoSkip: false,
        //         //             // autoSkipPadding: 5,
        //         //             // source: 'labels'
        //         //         },
        //         //         // borderDash: [10, 10],
        //         //         // borderDashOffset: 1.0,
        //         //         // drawBorder: true,
        //         //         // offsetGridLines: true
        //         //         stacked: true,
        //         //     }],
        //         //     yAxes: [{
        //         //         gridLines: {
        //         //             borderDash: [5],
        //         //             drawTicks: false,
        //         //         },
        //         //         ticks: {
        //         //             min: 0,
        //         //             max: 300,
        //         //             beginAtZero: true,
        //         //             fontColor: 'rgba(203, 203, 203, 1)',
        //         //             fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        //         //             padding: 5,
        //         //             // Inclui um valor de milhar em (k) no final do número
        //         //             callback: function(value, index, values) {
        //         //                 if (value != 0) {
        //         //                     return value + "k";
        //         //                 } else {
        //         //                     // Ignorando a mostra do número 0
        //         //                     return "";
        //         //                 }
        //         //             },
        //         //         },
        //         //         stacked: true
        //         //     }]
        //         // },
        //     };
        // }
        // testando desenho do gráfico com angular-chart.js - FIM        
    }
})();
