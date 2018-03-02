/**
 * Created by Josue on 25/01/2018.
 */
angular.module("main_module")
    .controller("reportes_TEC_Controller",function ($scope,Factory_Http_Request) {
        $scope.menor_28_primera_vez = 0;
        $scope.menor_28_subsecuente = 0;

        $scope.menor_1_primera_vez = 0;
        $scope.menor_1_subsecuente = 0;

        $scope.entre_1y4_primera_vez = 0;
        $scope.entre_1y4_subsecuente = 0;

        $scope.entre_5y9_primera_vez = 0;
        $scope.entre_5y9_subsecuente = 0;

        $scope.entre_10y19_primera_vez = 0;
        $scope.entre_10y19_subsecuente = 0;

        $scope.entre_20y64_primera_vez = 0;
        $scope.entre_20y64_subsecuente = 0;

        $scope.mayor_65_primera_vez = 0 ;
        $scope.mayor_65_subsecuente = 0;

        $scope.total_primera_vez = 0;
        $scope.total_subsecuente = 0;
        
        verificar_Fecha();
        extraer_data();
        //PARA DESBLOQUEAR O BLOQUEAR EL BOTÓN DE IMPRIMIR REPORTE DEPENDIENDO DE LA FECHA EN QUE SE ENCUENTRE
        function verificar_Fecha() {
            let current_date = new Date();
            let day = current_date.getDate();


            if(day > 26) {
                $.notify("Ya se encuentra en fecha para realizar reportes!","success");
            }
            else{
                $.notify("Aún no se encuentra en fecha para realizar los reportes","info");
            }
        }

        //Para obtener los datos de la BD a partir de 2 fechas solicitadas
        function set_date(){
            let current_date = new Date();

            let fecha_inicial = "";
            let fecha_final = "";


            fecha_inicial = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + "01";
            fecha_inicial+=" 06:00:00";

            fecha_final = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + current_date.getDate();
            fecha_final+=" 23:00:00";

            let fecha ={
                fechaInicial: fecha_inicial,
                fechaFinal: fecha_final
            };
            return fecha;

        }

        //PARA CARGAR LOS DATOS OBTENIDOS DE LA BD
        function extraer_data() {
            Factory_Http_Request.get_TEC_data(set_date(),function (http_Request_Callback) {
                if(http_Request_Callback != null){
                    distribuir_data(http_Request_Callback);
                }
                else{
                    $.notify("No hay registros!","info");
                }
            })
        }


        //Para distribuir la informacion recibida de la BD
        function distribuir_data(result) {
            for(item in result[0]){//PARA LOS PRIMERA_VEZ
                $scope.total_primera_vez++;

                if(65 <= result[0][item] ){
                    $scope.mayor_65_primera_vez++;
                }
                else{
                    if(result[0][item] <= 64 && 20 <= result[0][item]){
                        $scope.entre_20y64_primera_vez++;

                        if(result[0][item] <= 28){
                            $scope.menor_28_primera_vez++;
                        }
                    }
                    if(result[0][item] < 20 && 10 <= result[0][item]){
                        $scope.entre_10y19_primera_vez++;
                    }
                    if(result[0][item] < 10 && 5 <= result[0][item]){
                        $scope.entre_5y9_primera_vez++;
                    }
                    if(1 <= result[0][item] && result[0][item] < 5){
                        $scope.entre_1y4_primera_vez++;
                    }
                    if(result[0][item] <= 1){
                        $scope.menor_1_primera_vez++;
                    }
                }
            }
            for(item in result[1]){ //PARA LOS SUBSECUENTE
                $scope.total_subsecuente++;

                if(65 <= result[1][item] ){
                    $scope.mayor_65_subsecuente++;
                }
                else{
                    if(result[1][item] <= 64 && 20 <= result[1][item]){
                        $scope.entre_20y64_subsecuente++;

                        if(result[1][item] <= 28){
                            $scope.menor_28_subsecuente++;
                        }
                    }
                    if(result[1][item] < 20 && 10 <= result[1][item]){
                        $scope.entre_10y19_subsecuente++;
                    }
                    if(result[1][item] < 10 && 5 <= result[1][item]){
                        $scope.entre_5y9_subsecuente++;
                    }
                    if(1 <= result[1][item] && result[1][item] < 5){
                        $scope.entre_1y4_subsecuente++;
                    }
                    if(result[1][item] <= 1){
                        $scope.menor_1_subsecuente++;
                    }
                }

            }

        }

    })
;