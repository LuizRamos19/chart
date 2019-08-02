var vm = this;
vm.filtroCodigoEC = "";
vm.filtroCNPJ = "";
vm.acompanharCampanha = acompanharCampanha;
vm.navegar = navegar;
vm.alterarPeriodo = alterarPeriodo;
vm.codigoEC = "-";
vm.cnpj = "-";
vm.campanhaAtual = "-";
vm.mdrNegociado = "-";
vm.indexTab = 0;
vm.data = new Date();
// Configurações do slider
gerarSliderMesAno("A", vm.data);
//Configuração do calendário - Início
// vm.opcoesData = {
//     showWeeks: false,
//     minDate: moment("2012-01-01"),
//     //maxDate: moment().add(45, "days"),
//     periodoMaximo: 6,
//     tipoPeriodoMaximo: "month"
// };

// vm.filtroData = {
//     dataDe: moment(),
//     dataAte: moment()
// };
// Configurações do slider - FIM
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
    // drawAngularChart();
    // drawCanvasChart();
    // drawChartJS();
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
        var graficoElemento = document.getElementById("myChart").getContext("2d");
        var legendaElemento = document.getElementById("myLegend");
        desenharGrafico.gerarGrafico(graficoElemento, legendaElemento, vm.dados);
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
function navegar(tipoConsulta, indexTab) {
    vm.indexTab = indexTab;
    vm.tipoConsulta = tipoConsulta;
    if (tipoConsulta !== "S") {
        gerarSliderMesAno(tipoConsulta, new Date());
    } else {
        gerarSliderSemana(new Date());
    }
}

/**
 * @ngdoc method
 * @name navegar
 * @description
 * Responsável por gerar as configurações do slider
 **/
function gerarSliderMesAno(tipo, data) {
    var meses = [
        { value: 1, legend: "Janeiro" },
        { value: 2, legend: "Fevereiro" },
        { value: 3, legend: "Março" },
        { value: 4, legend: "Abril" },
        { value: 5, legend: "Maio" },
        { value: 6, legend: "Junho" },
        { value: 7, legend: "Julho" },
        { value: 8, legend: "Agosto" },
        { value: 9, legend: "Setembro" },
        { value: 10, legend: "Outubro" },
        { value: 11, legend: "Novembro" },
        { value: 12, legend: "Dezembro" }
    ];

    var periodoRange = 3;

    if (tipo === "A") {
        data = data.getFullYear();
    }
    if (tipo === "M") {
        data = data.getMonth();
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
        for (var i = data - periodoRange; i <= data; i++) {
            if (tipo === "M") {
                periodos.push({ value: i, legend: meses[i].legend })
            } else {
                periodos.push({ value: i, legend: "" + i + "" });
            }
        }
        return periodos;
    }
    vm.slider = opcoesSlider;
}

function gerarSliderSemana(data) {
    var periodoRange = 45;
    data = data.getDate();
    var opcoesSlider = {
        value: data,
        minValue: 10,
        maxValue: 100,
        options: {
            floor: 45,
            ceil: 1,
            step: 15,
            noSwitching: true,
            // showTicksValues: true
        }
    }

    vm.slider = opcoesSlider;            
}

/**
 * @ngdoc method
 * @name navegar
 * @description
 * Responsável por alterar o gráfico de acordo com o período selecionado no Slider
 **/
function alterarPeriodo(any) {
    console.log("teste ", vm.slider.value)
}
