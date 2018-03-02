/**
 * Created by Josue on 23/01/2018.
 */
angular.module("main_module")
    .controller("reportes_CCSS_Controller",function ($scope,Factory_Http_Request) {
        $scope.subsecuente = 0;
        $scope.primera_vez = 0;
        $scope.total_reporte_CCSS = 0;

        verificar_Fecha();
        extraer_data();
        //PARA DESBLOQUEAR O BLOQUEAR EL BOTÓN DE IMPRIMIR REPORTE DEPENDIENDO DE LA FECHA EN QUE SE ENCUENTRE
        function verificar_Fecha() {
            let current_date = new Date();
            let day = current_date.getDate();
            let month = current_date.getMonth()+1;


            if(day > 26 && (month == 6 || month ==7 || month == 11 || month == 12)) {
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

            //let lastDayOfMonth = new Date(current_date.getFullYear(), current_date.getMonth()+1, 0);

            if(6 >= current_date.getMonth()+1){//febrero a junio
                fecha_inicial = current_date.getFullYear() + '-' + "01" + '-' + "01";
                fecha_inicial+=" 06:00:00";

                fecha_final = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + current_date.getDate();
                fecha_final+=" 23:00:00";
            }
            else {//agosto a noviembre
                fecha_inicial = current_date.getFullYear() + '-' + "08" + '-' + "01";
                fecha_inicial+=" 06:00:00";

                fecha_final = current_date.getFullYear() + '-' + (current_date.getMonth()+1) + '-' + current_date.getDate();
                fecha_final+=" 23:00:00";
            }


            let fecha ={
                fechaInicial: fecha_inicial,
                fechaFinal: fecha_final
            };
            return fecha;

        }

        //Extrae la información de la BD
        function extraer_data() {
            Factory_Http_Request.get_CCSS_data(set_date(),function (http_Request_Callback) {
                if(http_Request_Callback != null){
                    console.log(http_Request_Callback);
                    $scope.primera_vez = http_Request_Callback[0];
                    $scope.subsecuente = http_Request_Callback[1];
                    $scope.total_reporte_CCSS = $scope.subsecuente + $scope.primera_vez;
                }
                else{
                    $.notify("No hay registros!","info");
                }
            })
        }


    })
;