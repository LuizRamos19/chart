(function () {
    "use strict";
    angular.module("apl-web-crh.reestruturacao-campanha").controller("reestruturacaoCampanhaController", reestruturacaoCampanhaController);

    reestruturacaoCampanhaController.$inject = [
        "appSettings",
        "consultarReestruturacaoCampanha",
        "interpretadorComunicacao",
        "desenharGrafico",
        "$filter",
        "$locale",
        "$element"
    ];

    /**
     * @ngdoc controller
     * @name reestruturacaoCampanhaController
     * @module apl-web-crh.reestruturacao-campanha
     * @description Controller principal da página reestruturacao-campanha
     */
    function reestruturacaoCampanhaController(
        appSettings,
        consultarReestruturacaoCampanha,
        interpretadorComunicacao,
        desenharGrafico,
        $filter,
        $locale,
        $element
    ) {

        var vm = this;
        vm.filtroCodigoEC = "";
        vm.filtroCNPJ = "";
        vm.change = change;
        vm.campanhaAtual = "-";
        vm.mdrNegociado = "-";
        
        vm.indexTab = 0;
        vm.data = new Date();
        vm.tipoConsulta = "A";
        vm.tipoFormatacaoData = "year";

        // Métodos
        vm.acompanharCampanha = acompanharCampanha;
        vm.navegar = navegar;
        vm.alterarPeriodo = alterarPeriodo;
        vm.abrirCalendario = abrirCalendario;
        vm.statusAccordion = { aberto: false };
        vm.estabelecimentosComerciais = [
            { codEc: "1234", cnpj: "322323233323" },
            { codEc: "1234", cnpj: "322323233323" },
            { codEc: "1234", cnpj: "322323233323" },
            { codEc: "1234", cnpj: "322323233323" },
            { codEc: "1234", cnpj: "322323233323" },
            { codEc: "1234", cnpj: "322323233323" }
        ]
        vm.campanhaConsultada = false;
        // Métodos - FIM

        vm.dados = [
                { x: "09/01/2018", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "10/01/2018", y: 300, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "10/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
                { x: "01/01/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "02/01/2019", y: 10, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "03/01/2019", y: 20, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "04/01/2019", y: 25, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "05/01/2019", y: 30, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "06/01/2019", y: 33, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "07/01/2019", y: 20, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "08/01/2019", y: 50, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "09/01/2019", y: 52, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "10/01/2019", y: 34, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "11/01/2019", y: 33, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "12/01/2019", y: 60, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "13/01/2019", y: 61, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "14/01/2019", y: 62, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "15/01/2019", y: 63, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "16/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "17/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "18/01/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "19/01/2019", y: 180, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "20/01/2019", y: 200, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "21/01/2019", y: 211, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "22/01/2019", y: 212, mdr: "XPTO", campanha: "Domicílio", periodo: "1" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "22/01/2019", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
                { x: "23/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
                { x: "24/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
                { x: "25/01/2018", y: null, mdr: null, campanha: null, periodo: null, cor: "rgba(89, 190, 93, 0.6)" },
                { x: "01/02/2019", y: 0, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "02/02/2019", y: 22, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "03/02/2019", y: 25, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "04/02/2019", y: 27, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
                { x: "05/02/2019", y: 31, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
                { x: "06/02/2019", y: 35, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
                { x: "07/02/2019", y: 37, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
                { x: "08/02/2019", y: 39, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(137, 137, 213, 0.6)" },
                { x: "09/02/2019", y: 41, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "10/02/2019", y: 43, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "11/02/2019", y: 45, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "12/02/2019", y: 49, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "13/02/2019", y: 60, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "14/02/2019", y: 68, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 137, 213, 0.6)" },
                { x: "15/02/2019", y: 170, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "16/02/2019", y: 177, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 190, 93, 0.6)" },
                { x: "17/02/2019", y: 183, mdr: "XPTO", campanha: "Domicílio", periodo: "2" , cor: "rgba(89, 190, 93, 0.6)" }
        ];

        iniciar();

        /**
         * @ngdoc controller
         * @name iniciar
         * @module apl-web-crh.reestruturacao-campanha
         * @description Função de inicialização do controller
         */
        function iniciar() {
            // Configurações do slider
            configurarSlider();
            // Configurações do slider - FIM            
            // DATEPICKER PADRÃO
            gerarCalendario();
            // DATEPICKER PADRÃO - FIM
        }

        /**
          * @ngdoc method
          * @name acompanharCampanha
          *
          * @methodOf apl-web-crh.reestruturacao-campanha:reestruturacaoCampanhaController
          *    
          * @description
          * Método responsável por pesquisar relatórios mdr
          **/
        function acompanharCampanha() {
            var param = {
                filtroCodigoEC: vm.filtroCodigoEC ? vm.filtroCodigoEC : "",
                filtroCNPJ: vm.filtroCNPJ ? vm.filtroCNPJ : ""
            };

            // if (!ultimoItem) {
            //     vm.ecPesquisado.retornoAcompanhamento = [];
            // } else {
            //     param.CodigoECPag = ultimoItem;
            // }

            interpretadorComunicacao.interpretar(consultarReestruturacaoCampanha.consultarCampanha(param))
                .sucesso(sucessoConsultarCampanhas)
                .erro(erroConsultarCampanhas);

            /**
              * @ngdoc function
              * @name sucessoConsultarCampanha
              *
              * @methodOf apl-web-crh.reestruturacao-campanha:reestruturacaoCampanhaController
              *
              * @description
              * Método responsável pelo sucesso da consulta de campanhas
              **/
            function sucessoConsultarCampanhas(retorno) {
                if (retorno.retornoAcompanhamento.length > 0) {
                    vm.maisOcorrencias = retorno.maisOcorrencias;
                    if (angular.isUndefined(vm.ecPesquisado.retornoAcompanhamento)) {
                        vm.ecPesquisado.retornoAcompanhamento = retorno.retornoAcompanhamento;
                    } else {
                        vm.ecPesquisado.retornoAcompanhamento = vm.ecPesquisado.retornoAcompanhamento.concat(retorno.retornoAcompanhamento);
                    }
                    vm.erro = undefined;
                    vm.campanhaConsultada = true;
                } else {
                    vm.erro = $filter("translate")("@naoExistemDados");
                    // vm.ecPesquisado.retornoAcompanhamento = [];
                }
            }

            /**
              * @ngdoc function
              * @name erroConsultarCampanhas
              *
              * @methodOf apl-web-crh.reestruturacao-campanha:reestruturacaoCampanhaController
              *
              * @description
              * Método responsável pelo erro da consulta de Campanhas
              **/
            function erroConsultarCampanhas() {
                vm.campanhaConsultada = true;
                var canvas = $element.find("canvas")[0];
                var graficoElemento = canvas.getContext("2d");
                desenharGrafico.gerarGrafico(graficoElemento, vm.dados, vm.data, vm.tipoFormatacaoData);
                vm.erro = $filter("translate")("@sistemaIndisponivel");
                // vm.ecPesquisado.retornoAcompanhamento = [];
            }
        }

        /**
         * @ngdoc method
         * @name navegar
         * @description
         * Responsável por fazer navegação das abas
         **/
        function navegar(tipoConsulta, indexTab, tipoFormatacaoData) {
            vm.indexTab = indexTab;
            vm.tipoConsulta = tipoConsulta;
            vm.tipoFormatacaoData = tipoFormatacaoData;
            // vm.data = new Date();
            configurarSlider();
            gerarCalendario();
            desenharGrafico.atualizar(vm.data, vm.tipoFormatacaoData);
        }

        /**
         * @ngdoc method
         * @name navegar
         * @description
         * Responsável por gerar as configurações do slider
         **/
        function configurarSlider() {
            if (vm.tipoConsulta === "S") {
                configurarSliderSemana();
                return;
            }
            var meses = $locale.DATETIME_FORMATS.MONTH;
            
            var periodoRange = 3;
            var data = null;

            if (vm.tipoConsulta === "A") {
                data = vm.data.getFullYear();
            }
            if (vm.tipoConsulta === "M") {
                data = vm.data.getMonth();
            }

            var opcoesSlider = {
                value: data,
                options: {
                    showTicksValues: true,
                    stepsArray: gerarPeriodos(data),
                    onChange: vm.alterarPeriodo
                }
            }

            function gerarPeriodos(data) {
                var periodos = [];
                var interação = data - periodoRange;
                
                if (vm.tipoConsulta === "M" && interação < 0) {
                    interação = 0;
                    data = 3;
                }

                for (var i = interação; i <= data; i++) {
                    if (vm.tipoConsulta === "M") {
                        periodos.push({ value: i, legend: meses[i] })
                    } else {
                        periodos.push({ value: i, legend: "" + i + "" });
                    }
                }
                return periodos;
            }
            vm.slider = opcoesSlider;
        }

        /**
         * @ngdoc method
         * @name navegar
         * @description
         * Responsável por gerar as configurações do slider pelas configurações de semana
         **/
        function configurarSliderSemana() {
            var periodoRange = 45;
            var data = vm.data.getDate();

            var numerosValidos = [45, 30, 15, 1];

            var opcoesSlider = {
                value: 7,
                // minValue: 1,
                // maxValue: data,
                options: {
                    showSelectionBarEnd: true,
                    showTicksValues: 15,
                    stepsArray: gerarPeriodos(data),
                    onChange: vm.alterarPeriodo
                }
            }

            function gerarPeriodos(data) {
                var periodos = [];
                for (var i = periodoRange; i >= 0; i--) {
                    if (numerosValidos.includes(i)) {
                        periodos.push({ value: i, legend: "" + i + "" });
                    } else {
                        periodos.push({ value: i, legend: "" });
                    }
                }
                return periodos;
            }

            vm.slider = opcoesSlider;            
        }

        /**
         * @ngdoc method
         * @name navegar
         * @description
         * Responsável por alterar o gráfico de acordo com o período selecionado no Slider
         **/
        function alterarPeriodo() {
            
            if (vm.tipoConsulta === "A") {
                setDate(vm.slider.value, vm.data.getMonth(), vm.data.getDate());
            }
            
            if (vm.tipoConsulta === "M") {
                setDate(vm.data.getFullYear(), vm.slider.value, vm.data.getDate());
            }
            
            if (vm.tipoConsulta === "S") {
                var data = moment(vm.data).subtract(vm.slider.value, "day");
            }
            desenharGrafico.atualizar(vm.data, vm.tipoFormatacaoData);
        }

        /**
         * @ngdoc method
         * @name gerarCalendario
         * @description
         * Responsável por definir as configurações que serão utilizadas pelo datepicker
         **/
        function gerarCalendario() {
            var locale = $locale.DATETIME_FORMATS.ano;
            var modoMinimo = "year";

            if (vm.tipoConsulta === "M") {
                locale = $locale.DATETIME_FORMATS.mes;
                modoMinimo = "month";
            }
            if (vm.tipoConsulta === "S") {
                locale = $locale.DATETIME_FORMATS.shortDate;
                modoMinimo = "day";
            }

            vm.dateOptions = {
                formatYear: $locale.DATETIME_FORMATS.ano,
                startingDay: 1,
                minMode: modoMinimo
            };

            vm.formats = [locale];
            vm.format = vm.formats[0];

            vm.status = {
                opened: false
            };
        }

        function abrirCalendario($event) {
            vm.status.opened = true;
        }

        function setDate(year, month, day) {
            vm.data = new Date(year, month, day);
        };
        // métodos do calendário - FIM

        function change() {
            configurarSlider(vm.data);
            desenharGrafico.atualizar(vm.data, vm.tipoFormatacaoData);
        }
    }
})();
