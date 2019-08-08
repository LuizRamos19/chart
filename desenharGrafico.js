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

    desenharGrafico.$inject = ["$locale"];

    /**
     * @ngdoc method
     * @name  desenharGrafico
     *
     * @methodOf apl-web-crh.reestruturacao-campanha: desenharGrafico
     *
     * @description
     * Contem metodos responsaveis por desenhar o grafico utilizando chart.js.
     **/
    function desenharGrafico($locale) {
        return {
            gerarGrafico: gerarGrafico,
            atualizar: atualizar
        };
        var chart;
        var mdrsValores;
        /**
         * @ngdoc method
         * @name  gerarGrafico
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @param {object} graficoElemento representa o contexto em 2D do gráfico em canvas
         * @param {object} dados representa os valores que serão populados no gráfico (x e y são as coordenadas)
         * 
         * @description
         * Responsavel por adicionar os dados e configurações que irão ser utilizadas pelo gráfico
         **/
        function gerarGrafico(graficoElemento, dados, data, tipoFormatacaoData, mdrs) {
            // testando draw
            var datas = gerarDatas(data, tipoFormatacaoData);
            mdrsValores = mdrs;

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
                                var valor = $locale.NUMBER_FORMATS.CURRENCY_SYM + dados.y.toFixed(2).replace($locale.NUMBER_FORMATS.GROUP_SEP, $locale.NUMBER_FORMATS.DECIMAL_SEP);
                                if (dados) {
                                    dadosRetornados = "Data: " + dados.x + "<br>";
                                    dadosRetornados += "Valor: " + valor + "<br>";
                                    dadosRetornados += "MDR: " + dados.mdr + "<br>";
                                    dadosRetornados += "Campanha: " + dados.campanha;
                                }
                                return dadosRetornados;
                            }
                        },
                        custom: gerarTooltip
                    },
                    layout: {
                        padding: {
                            left: 30,
                            right: 20,
                            bottom: 100
                        }
                    },
                    legend: {
                        display: false,
                        position: "bottom",
                        labels: {
                            fontColor: "rgba(154, 154, 154, 1)"
                        }
                    },
                    elements: {
                        line: {
                            tension: 0
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            bounds: "ticks",
                            time: {
                                parser: $locale.DATETIME_FORMATS.dataAbreviadaMoment,
                                unit: "month",
                                min: new Date(datas.dataInicial),
                                max: new Date(datas.dataFinal),
                                stepSize: 1
                            },
                            gridLines: {
                                color: "rgba(190, 190, 190, 1)",
                                lineWidth: 2,
                                drawBorder: false
                            },
                            position: "top",
                            ticks: {
                                fontFamily: "'Arial'",
                                fontSize: 11,
                                fontColor: "rgba(136, 136, 136, 1)",
                                padding: 5,
                                beginAtZero: true
                                // stepSize: 0.5,
                            },
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
            chart = new Chart(graficoElemento, ctxOptions);
        }

        function gerarDatas(data, tipoFormatacaoData) {
            return {
                dataInicial: moment(data).startOf(tipoFormatacaoData),
                dataFinal: moment(data).endOf(tipoFormatacaoData)
            }
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
                // caso contrário, não se alinhará com a posição do ponto.
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
         * @name  gerarLegendas
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por gerar a legenda do gráfico (Retãngulos com as cores e labels dos períodos e campanhas)
         **/
        function gerarLegendas(chart) {
            // Gerando os labels de periodos e campanhas
            var textos = ["Periodos", "Campanha"];
            var pointY = chart.chartArea.bottom + 17;
            for (var i = 0; i < textos.length; i++) {
                var pointX = chart.chartArea.left - 5;
                chart.ctx.fillStyle = "rgba(125, 125, 125, 1)";
                chart.ctx.font = "12px Arial";
                chart.ctx.textAlign = "right";
                chart.ctx.textBaseline = "middle";
                chart.ctx.fillText(textos[i], pointX, pointY);
                chart.ctx.restore();
                pointY+=30;
            }
            // Gerando os labels de periodos e campanhas - FIM
            // Gerando as labels da legenda
            pointX = chart.chartArea.left;

            for (var i = 0; i < mdrsValores.length; i++) {
                var comprimentoRet = 30;
                var larguraRet = 15;
                var retTexto = 5;
                var texto = mdrsValores[i].label + ": " + mdrsValores[i].valor;
                var textWidth = chart.ctx.measureText(texto).width;
                
                // valida se tudo o que for desenhado será depois da largura do gráfico, caso seja, quebra linha
                if ((pointX + comprimentoRet + textWidth + retTexto) > chart.chartArea.right) {
                    pointX = chart.chartArea.left;
                    pointY+=30;
                }

                // desenhando o retângulo com a cor
                chart.ctx.save();
                chart.ctx.strokeStyle = mdrsValores[i].cor;
                chart.ctx.beginPath();
                chart.ctx.lineWidth = larguraRet;
                chart.ctx.moveTo(pointX, pointY);
                pointX+=comprimentoRet;
                chart.ctx.lineTo(pointX, pointY);
                chart.ctx.stroke();
                
                // desenhando o texto que acompanha o retângulo
                chart.ctx.fillStyle = "rgba(125, 125, 125, 1)";
                chart.ctx.font = "12px Arial";
                chart.ctx.textAlign = "left";
                chart.ctx.textBaseline = "middle";
                pointX+=retTexto;
                chart.ctx.fillText(texto, pointX, pointY);
                chart.ctx.restore();
                pointX+=textWidth + comprimentoRet;
            }
            // Gerando as labels da legenda - FIM
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

            gerarLegendas(chart);
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

        /**
         * @ngdoc method
         * @name  atualizar
         *
         * @methodOf apl-web-crh.reestruturacao-campanha
         *
         * @description
         * Responsavel por atualizar o grafico
         **/
        function atualizar(data, tipoFormatacaoData) {
            var datas = gerarDatas(data, tipoFormatacaoData);
            chart.options.scales.xAxes[0].time.min = new Date(datas.dataInicial);
            chart.options.scales.xAxes[0].time.max = new Date(datas.dataFinal);
            
            if (tipoFormatacaoData != "year") {
                chart.options.scales.xAxes[0].time.stepSize = 1;
                chart.options.scales.xAxes[0].time.unit = "day";
            } else {
                chart.options.scales.xAxes[0].time.unit = "month";
                chart.options.scales.xAxes[0].time.stepSize = 3;
            }

            chart.update();
        }
    }
})();
