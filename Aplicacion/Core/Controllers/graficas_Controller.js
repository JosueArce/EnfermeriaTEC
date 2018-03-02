/**
 * Created by Josue on 11/01/2018.
 */
angular.module("main_module")
    .controller("Graficas_Frecuencia_Controller",function ($scope,Factory_Http_Request) {
        $scope.primera_vez = 0;
        $scope.subsecuente = 0;


        function set_Date() {
            let current_date = new Date();

            let fecha_inicial = "";
            let fecha_final = "";

            let lastDayOfMonth = new Date(current_date.getFullYear(), current_date.getMonth()+1, 0);

            fecha_inicial = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + "01";
            fecha_inicial+=" 06:00:00";

            fecha_final = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + lastDayOfMonth.getDate();
            fecha_final+=" 23:00:00";

            let fecha ={
                fechaInicial: fecha_inicial,
                fechaFinal: fecha_final
            };
            return fecha;
        }


        $scope.on_load = function () {
            Factory_Http_Request.get_frecuency_data(set_Date(),function (http_request_result) {
                if(http_request_result != null){
                    $scope.primera_vez = http_request_result[0];
                    $scope.subsecuente = http_request_result[1];
                    setTimeout(function () {
                        $scope.$apply(function () {
                            charge_chart(http_request_result[0],http_request_result[1]);
                        });
                    }, 1000);
                }
            });


        };


        function charge_chart(primera_vez,subsecuente) {
            var ctx = document.getElementById("chart_frecuencia").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Primera Vez", "Subsecuente"],
                    datasets: [{
                        label: '# of Votes',
                        data: [ primera_vez, subsecuente],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }



    })
    .controller("Graficas_CantCitas_Controller",function ($scope,Factory_Http_Request) {


        function set_Date() {
            let current_date = new Date();

            let fecha_inicial = "";
            let fecha_final = "";

            let lastDayOfMonth = new Date(current_date.getFullYear(), current_date.getMonth()+1, 0);

            fecha_inicial = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + "01";
            fecha_inicial+=" 06:00:00";

            fecha_final = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + lastDayOfMonth.getDate();
            fecha_final+=" 23:00:00";

            let fecha ={
                fechaInicial: fecha_inicial,
                fechaFinal: fecha_final
            };
            return fecha;
        }
        $scope.on_load = function () {
            Factory_Http_Request.get_dates_data(set_Date(),function (http_request_result) {
                if(http_request_result != null){
                    setTimeout(function () {
                        $scope.$apply(function () {
                            charge_chart(http_request_result[0],http_request_result[1],http_request_result[2],http_request_result[3]);
                        });
                    }, 1000);
                }
            });


        };


        function charge_chart(estudiante,funcionario,familiar,pensionado) {
            var ctx = document.getElementById("chart_cantcitas").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Estudiante", "Funcionario","Familiares","Pensionados"],
                    datasets: [{
                        label: '# of Votes',
                        data: [ estudiante,funcionario,familiar,pensionado],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    })
    .controller("Graficas_Genero_Controller",function ($scope,Factory_Http_Request) {

        function set_Date() {
            let current_date = new Date();

            let fecha_inicial = "";
            let fecha_final = "";

            let lastDayOfMonth = new Date(current_date.getFullYear(), current_date.getMonth()+1, 0);

            fecha_inicial = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + "01";
            fecha_inicial+=" 06:00:00";

            fecha_final = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + lastDayOfMonth.getDate();
            fecha_final+=" 23:00:00";

            let fecha ={
                fechaInicial: fecha_inicial,
                fechaFinal: fecha_final
            };
            return fecha;
        }
        $scope.on_load = function () {
            Factory_Http_Request.get_gender_data(set_Date(),function (http_request_result) {
                if(http_request_result != null){
                    setTimeout(function () {
                        $scope.$apply(function () {
                            charge_chart(http_request_result[0],http_request_result[1]);
                        });
                    }, 1000);
                }
            });


        };


        function charge_chart(hombres,mujeres) {
            var ctx = document.getElementById("chart_genero").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Masculino", "Femenino"],
                    datasets: [{
                        label: '# of Votes',
                        data: [ hombres,mujeres],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    })
;
