(function() {
    var app = angular.module("chart", ["ngRoute", "chart.js"]);

    console.log('testeetete')
    app.config(function($routeProvider) {
        $routeProvider
            .when("/index", {
                templateUrl: "index.html",
                controller: "chartController"
            })
            .otherwise({redirectTo:"/index"});
    });
})();