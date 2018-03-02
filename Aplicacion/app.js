//Declaracion de variable app que contiene como referencia el modulo acreditacion
//Se le inyecta ngRoute el cual permite manejar rutas dentro de un mismo archivo HTML
angular.module("main_module",['ngRoute','LocalStorageModule','http_Request'])

    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            controller:"login_Controller",
            templateUrl: "index.html"
        })
        .when('/home',{
            controller:"MainPage_Controller",
            templateUrl:"../templates/main_page.html"
        })
        .when('/Registros',{
            controller:"Registros_Controller",
            templateUrl:"../templates/Registros.html"
        })
        .when('/Graficas/Frecuencia',{
            controller:"Graficas_Frecuencia_Controller",
            templateUrl:"../templates/graficas_frecuencia.html"
        })
        .when('/Graficas/Genero',{
            controller:"Graficas_Genero_Controller",
            templateUrl:"../templates/graficas_genero.html"
        })
        .when('/Graficas/CantidadCitas',{
            controller:"Graficas_CantCitas_Controller",
            templateUrl:"../templates/graficas_cantidad_citas.html"
        })
        .when('/Reportes/CCSS',{
            controller:"reportes_CCSS_Controller",
            templateUrl:"../templates/reportes_CCSS.html"
        })
        .when('/Reportes/TEC',{
        controller:"reportes_TEC_Controller",
        templateUrl:"../templates/reportes_TEC.html"
        })
        .when('/About',{
            templateUrl:"../templates/about.html"
        })
        ;
    }])
;

